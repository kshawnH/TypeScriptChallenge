// 类型保护， 通过判断，去识别类型 ， 核心就是进行类型的收窄
// js 手段来判断类型 typeof | instanceof | in  都有收窄类型的功能  , 通过条件来进行判断
// ts 来判断 (可辨识联合类型) 自定义类型保护（自己决定返回true的时候是什么类型） null保护（判断非空后再去使用）
// 除了我们上述提供的这些，只要能通过结构来判断的 都能达到类型保护的特性
function double(val: number | string) {
  if (typeof val === "string") {
    val.charAt(0);
  } else {
    val.toFixed();
  }
}
class Person {}
class Dog {}
function getInstance(clazz: new () => Dog | Person) {
  return new clazz();
}
let instance = getInstance(Person);
if (instance instanceof Dog) {
  instance;
} else {
  instance;
}

interface Bird {
  kind: "鸟";
  fly: string;
}
interface Fish {
  kind: "鱼";
  swiming: string;
}

function isBird(animal: Bird | Fish): animal is Bird {
  // 自定义的条件
  return animal.kind === "鸟";
}

function getAnimal(animal: Bird | Fish) {
  if (isBird(animal)) {
    // 联合类型可以访问共同存在的类型，来识别类型
    animal;
  } else {
    animal;
  }

  if ("fly" in animal) {
    animal;
  } else {
    animal;
  }
}

const addPrefix = (num?: number) => {
  num = num || 100;

  function fn() {
    // ts 静态的检查
    // 内部方法无法解析外层函数的默认值
    if (num) {
      return "人民币:" + num!.toString();
    }
  }
  return fn();
};
addPrefix();

function ensureArray<T>(input: T | T[]): T[] {
  if (Array.isArray(input)) {
    return input;
  } else {
    return [input];
  }
}

export {};
