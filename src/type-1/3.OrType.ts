// 3.子类型互斥
interface Man1 {
  fortune: string;
}
interface Man2 {
  funny: string;
}
interface Man3 {
  foreign: string;
}

type ManType = Man1 | Man2 | Man3; // 我希望MainType只能是其中的一种类型
let man: ManType = {
  // 类型兼容性
  fortune: "富有",
  funny: "风趣",
  foreign: "洋派",
};
// 互斥属性，

// man1 - man2 将man1的属性标记成never + man2
// man2 - man1 将man2的属性标记成never + man1

type DiscardType<T, U> = { [K in Exclude<keyof T, keyof U>]?: never };
//  | (DiscardType<U, T> & T);
type OrType<T, U> = (DiscardType<T, U> & U) | (DiscardType<U, T> & T);
type manType2 = OrType<Man3, OrType<Man1, Man2>>; // 对多个对象可以进行互斥
let man2: manType2 = {
  // 类型兼容性
  fortune: "富有",
};

// 核心就是 我要排除你的属性，在我的结构里将你的属性定义成never
export {};
