import "reflect-metadata";
const REQUIRED_KEY = Symbol();
const VALIDATE_TYPE_KEY = Symbol();
function Required() {
  return function (target: object, key: string) {
    // 先记录那些属性是必填的， 校验的时候来找这些属性是否有值

    // 在记录的时候不要给属性添加，后续校验如果没有这个属性，那就找不到记录了

    // target 是原型
    const requiredKeys: string[] =
      Reflect.getMetadata(REQUIRED_KEY, target) || [];
    Reflect.defineMetadata(REQUIRED_KEY, [...requiredKeys, key], target);

    // 定义好的元数据
  };
}

enum Type {
  String = "string",
  Number = "number",
}

function ValueType(type: Type) {
  return (target: object, key: string) => {
    // 描述当前属性的类型
    Reflect.defineMetadata(VALIDATE_TYPE_KEY, type, target, key);
  };
}

class Person {
  @ValueType(Type.String)
  @Required()
  name!: string;

  @ValueType(Type.Number)
  @Required()
  age!: number;
}

// 先要求属性必填
function validate(instance: any) {
  let existsKeys = Reflect.ownKeys(instance);

  const requiredKeys = Reflect.getMetadata(REQUIRED_KEY, instance);
  for (let key of requiredKeys) {
    // 获取属性对应的类型， 用这个类型来校验是否满足
    const validate_type = Reflect.getMetadata(VALIDATE_TYPE_KEY, instance, key);
    if (validate_type) {
      if (typeof instance[key] !== validate_type) {
        throw new Error("这个属性" + key + "类型不正确");
      }
    }
    if (!existsKeys.includes(key)) {
      throw new Error("这个" + key + "没有传递");
    }
  }
}
const person = new Person();
// @ts-ignore
person.name = "jiangwen";
// @ts-ignore
person.age = 123;

validate(person); // 校验, 提示name属性应该是字符串而非number

// @ts-ignore 不管有没错误 我都不管，丧失校验
// @!ts-expect-error 我确定下一行是报错的
// @ts-nocheck 丧失对此文件的校验
// @ts-check jsdoc 来使用的

// 装饰器 + 反射元数据 = 可以做一些校验， 手机代码的逻辑后续统一处理。
export {};
