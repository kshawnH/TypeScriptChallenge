// 条件类型
// 和泛型约束通常一起使用，类似三元运算符， 泛型约束是用来约束泛型的（也包含了判断）， 条件是用来判断的

type ResStatusMessage<T extends number> = T extends 200 | 204 | 206
  ? "success"
  : "fail";

type R1 = ResStatusMessage<200>;

type Conditional<T, U> = T extends U ? "success" : "fail";
type R2 = Conditional<"jiangwen", string>;
type R3 = Conditional<"jiangwen", number>;

interface Bird {
  name: "鸟";
}
interface Sky {
  name: "天";
}
interface Fish {
  name: "鱼";
}
interface Water {
  name: "水";
}
type Conditional1<T> = T extends Bird ? Sky : Water;
type R4 = Conditional1<Fish>;

// 泛型一般代表输入是不确定的（无限的） 约束 ， 函数重载(有限的)

type FormatReturnVal<T extends string | number> = T extends string
  ? string
  : T extends number
  ? number
  : never;
function sum<T extends string | number>(a: T, b: T): FormatReturnVal<T> {
  // 泛型类型不能做 数学运算
  return a + (b as any); // T + T = ?
}
let r = sum(1, 2);

export {};
