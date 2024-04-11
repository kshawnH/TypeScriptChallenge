// @ts-nocheck
// 元组类型转换为枚举类型

// 默认情况下，枚举对象中的值就是元素中某个类型的字面量类型

import { FindIndex, IsEqual } from "./10.FindIndex";

export type TupleToEnum<T extends any[], I = false> = {
  // 循环每一项，判断是否要的是索引还是值
  readonly [K in T[number]]: IsEqual<I, true, FindIndex<T, K>, K>;
};

type a1 = TupleToEnum<["MacOS", "Windows", "Linux"]>;
// -> { readonly MacOS: "MacOS", readonly Windows: "Windows", readonly Linux: "Linux" }

// 如果传递了第二个参数为true，则枚举对象中值的类型就是元素类型中某个元素在元组中的index索引，也就是数字字面量类型
type a2 = TupleToEnum<["MacOS", "Windows", "Linux"], true>;
// -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }

export {};
