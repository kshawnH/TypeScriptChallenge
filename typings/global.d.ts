// 声明文件就应该以.d.ts 结尾
declare let age: number;

// 这里只是类型声明，不应该有具体的实现，只是为了防止编辑器报错而已
declare function sum(a: string, b: string): string;

declare class Person {}

declare enum Seasons {
  Spring,
  Winte,
  Summer,
  Autumn,
}
declare namespace Zoo {
  export let dog: string;
}

declare interface IVeg {
  size: string;
  color: string;
}
