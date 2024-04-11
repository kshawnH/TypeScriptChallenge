import "reflect-metadata";
const REQUIRED_KEY = Symbol();
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

class Person {
  @Required()
  name!: string;
  @Required()
  age!: number;
}

// 先要求属性必填
function validate(instance: object) {
  let existsKeys = Reflect.ownKeys(instance);

  const requiredKeys = Reflect.getMetadata(REQUIRED_KEY, instance);
  for (let key of requiredKeys) {
    if (!existsKeys.includes(key)) {
      throw new Error("这个" + key + "没有传递");
    }
  }
}
const person = new Person();
person.name = "abc";
person.age = 123;
validate(person); // 校验

export {};
