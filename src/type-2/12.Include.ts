// 判断传入的字符串字面量类型中是否含有某个字符串

type Include<T extends string, C extends string> = T extends ""
  ? C extends ""
    ? true
    : false
  : T extends `${infer L}${C}${infer R}` // ""J   // 上面是排除空的情况
  ? true
  : false;

type a1 = Include<"Jiang", "J">; // true
type a2 = Include<"", "aaa">; // false
type a3 = Include<"", "">; // true 空字符串时需要特殊处理
export {};
