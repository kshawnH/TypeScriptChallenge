// 装饰器就是一个函数，只能在类中使用 （类本身，类成员使用）
// 装饰器的分类：类的装饰器，方法装饰器，属性装饰器， 访问装饰器， 参数装饰器

// 1).类的装饰器 给类来进行扩展的. 也可以返回一个子类去重写父类 (一般不用通过装饰器去扩展类的属性和方法，因为扩展后原来没有的方法无法访问到， 需要通过namespace,interface 来进行扩展)

const classDecorator = <T extends new (...args: any[]) => any>(target: T) => {
  (target as any).type = "动物";
  (target as any).getType = function () {
    return this.type;
  };

  Object.assign(target.prototype, {
    eat() {},
    drink() {},
  });
};
// @classDecorator
function OverrideAnimal(target: any) {
  return class extends target {
    eat() {
      super.eat();
      console.log("new eat");
    }
  };
}
// @classDecorator
// 2)方法装饰器
function Enum(isEnum: boolean): MethodDecorator {
  return function (target, propertyKey, desriptor) {
    // desriptor.enumerable // 是否可枚举
    // desriptor.writable // 是否能被重写
    // desriptor.configurable // 是否属性能被删除
    // desriptor.value // 当前函数的值
    desriptor.enumerable = isEnum;

    let original = desriptor.value as any;
    desriptor.value = function () {
      console.log("prev eat");
      return original(...arguments);
    } as any;
  };
}

function ToUpper(isUpper: boolean): PropertyDecorator {
  return function (target, propertyKey) {
    // 不同的es版本会有不同的解析

    // 这个地方貌似是给原型添加了个属性. 如果在es2015 可以设置原型属性，后续赋值的时候会触发原型属性
    // 如果在esnext中无法触发
    let val = "";
    Object.defineProperty(target, propertyKey, {
      enumerable: true,
      get() {
        return val.toUpperCase();
      },
      set(newValue) {
        val = newValue;
      },
    });
  };
}

// 除了描述类和静态方法之外target都是原型

// 3)可以描述属性访问器 get 和 set

function valToUpper(target: any, key: string, descriptor: any) {
  let originalSet = descriptor.set;
  let originalGet = descriptor.get;
  descriptor.set = function (newValue: string) {
    return originalSet.call(this, newValue.toUpperCase());
  };
  descriptor.get = function () {
    return originalGet.call(this) + "abc";
  };
}
function Params() {
  return (target: any, key: any, index: number) => {
    console.log(target, key, index, arguments);
  };
}
class Animal {
  constructor(@Params() age: number) {}
  @ToUpper(true)
  public name: string = "animal";
  @Enum(true) // 最终装饰器必须返回一个函数
  eat() {
    console.log("动物 original");
  }

  private _val!: string;
  @valToUpper
  get val() {
    return this._val;
  }
  set val(newValue: string) {
    this._val = newValue;
  }
}
// console.log((Animal as any).getType());
const animal = new Animal(100);
animal.eat();

console.log(animal);

animal.val = "abc";
console.log(animal.val);

// 类的装饰器， 属性装饰器（静态的属性装饰器），方法装饰器（静态方法装饰器）， 属性访问装饰器（get,set）
// 参数装饰器
export {};
