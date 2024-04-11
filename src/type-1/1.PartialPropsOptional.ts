// 内置类型
// Partial、 Required 、 Readonly 修饰类型的
// Pick Omit 处理数据结构
// Exclude Extract 处理集合类型的
// Paramters ReturnValue infer
// 字符串类型 模板字符串 `${}`  + infer

// 1.部分属性可选

interface Person {
  name: string;
  age: number;
  address: string;
}
// 写类型的时候多种写法 都可以实现相同的功能
type PartialPropsOptional<T extends object, K extends keyof T> = Partial<
  Pick<T, K>
> &
  Omit<T, K>;

type Computed<T> = {
  [K in keyof T]: T[K];
};
type p1 = Computed<PartialPropsOptional<Person, "age" | "address">>;
export {};
