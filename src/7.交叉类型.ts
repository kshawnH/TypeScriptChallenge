// & 交叉类型
// |  => ||
// &  => &&

// | 并集
// & 交集  ts中的 (交叉的部分， 可以赋予给之前的任意一个类型)

interface Person1 {
  handsome: string;
  n: {
    n: number;
  };
}
interface Person2 {
  high: string;
  n: {
    b: string;
  };
}
interface Person3 {
  rich: string;
}
// 又高又帅的人， 是交集 还是并集

type Person4 = Person1 & Person2 & Person3;
let person4: Person4 = {
  handsome: "帅",
  high: "高",
  rich: "富",
  n: {
    n: 1,
    b: "20", // 如果类型冲突，会出现never的情况
  },
};

function mixin<T, K>(o1: T, o2: K) {
  return { ...o1, ...o2 };
}
let result = mixin({ a: "abc" }, { a: 123 });

type IMixin = typeof result;
type Ival = IMixin["a"]; // 交叉类型出现的never问题

type a = "number" | "string";

export {};
