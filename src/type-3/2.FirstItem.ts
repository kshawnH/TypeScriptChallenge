// 得到元组类型中的第一个元素

export type FirstItem<T extends any[]> = T[0];
type A = FirstItem<[string, number, boolean]>; // string
type B = FirstItem<["B", "F", "E"]>; // 'B'
export {};
