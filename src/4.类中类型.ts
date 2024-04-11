// 类本身就可以充当类型 ， 可以描述实例  (类类型)

// ts 中要求所有的属性 必须先声明在使用 （采用修饰符来声明）

// 1)实例属性
class Circle {
  public x?: number;
  public y: number;
  constructor(x: number, y?: number) {
    // 构造函数就是函数，用法同函数
    this.x = x;
    this.y = y || 100;
  }
  //...
}
// public 公开属性  （父、子、外界都能访问） 默认就是public
// protected 受保护的 (父、子)
// private (父)
// readonly 仅读属性 只能初始化的时候赋值，后续不能修改 (类似于const)
/*
class Animal {
  #xxx = "abc"; // js 语法 新增的
  constructor(public readonly name: string, public age: number) {}
}
class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age);
    // this.name; // 子可以访问属性
    // this.name = "abc"; readonly 初始化后不能再继续修改
  }
}
const tom = new Cat("Tom猫", 18);
console.log(tom.age); // this['name'] 使用此方式可以访问私有属性 绕过ts检测
*/
// 类的功能 主要是实例属性、原型属性、静态属性、

// 2)属性访问器
// 类中的Object.defineProperty === 属性访问器
/*
class Animal {
  static habitat = "地球";
  static getHabitat() {
    return this.habitat;
  }
  private _sound: string = "";
  constructor(public name: string, public age: number) {}
  get sound() {
    return this._sound;
  }
  set sound(value: string) {
    this._sound = value;
  }
  eat(food: string): void {
    console.log(`正在吃${food}`);
  }
}
class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age); // Animal.call
  }
  static getHabitat() {
    console.log("在家中~~~");
    return super.getHabitat();
  }
  eat() {
    // 子类重写父类 要保证兼容父类的类型
    super.eat("鱼儿");
  }
}
let cat = new Cat("Tom", 18);
cat.sound = "猫猫叫"; // 属性访问器
console.log(cat.sound);
cat.eat(); // 原型方法
console.log(Cat.getHabitat()); // 静态的
// super 原型方法是指向实例 ， 构造函数和静态方法中指向父类
*/
class Singleton {
  private static instance = new Singleton();
  private constructor() {}

  static getInstance() {
    return this.instance;
  }
}
let ins1 = Singleton.getInstance();
let ins2 = Singleton.getInstance();
console.log(ins1 === ins2);

// 抽象类
// 1.不能被new
// 2.抽象类中可以创建抽象属性和方法，让子类来实现，但是静态方法、属性不可以
// 3.抽象类中可以拥有具体的实现
abstract class Animal {
  static habitat = "地球";
  abstract eat(): void; // 没有具体实现， 一般描述是原型方法
  abstract play: () => void; //但是一般 这种情况描述的是实例方法
  // 默认我们应该采用eat() 来声明方法

  drink() {
    // 有具体实现
    console.log("喝水");
  }
}
class Cat extends Animal {
  play: () => void = () => {};
  eat(): void {
    throw new Error("Method not implemented.");
  }
}
let cat = new Cat();
console.log(cat);

class ToArray {
  convert(value: string): string[];
  convert(value: number): number[];
  convert(value: number | string): string[] | number[] {
    if (typeof value === "string") {
      return value.split("");
    } else {
      return value.toString().split("").map(Number);
    }
  }
}
let toArray = new ToArray();
toArray.convert(123);

export {};
