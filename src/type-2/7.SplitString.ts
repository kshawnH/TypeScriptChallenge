// 将字符串字面量类型按照指定字符，分割为元组。无法分割则返回原字符串字面量

export type SplitString<
  T extends string,
  S extends string,
  A extends any[] = []

  // 根据infer 的左右来分割， 左边放到数组中，右边递归，最终在结果集中增加无法匹配的即可
> = T extends `${infer L}${S}${infer R}`
  ? SplitString<R, S, [...A, L]>
  : [...A, T];

type A1 = SplitString<"handle-open-flag", "-">; // ["handle", "open", "flag"]
type A2 = SplitString<"open-flag", "-">; // ["open", "flag"]
type A3 = SplitString<"handle.open.flag", ".">; // ["handle", "open", "flag"]
type A4 = SplitString<"open.flag", ".">; // ["open", "flag"]
type A5 = SplitString<"open.flag", "-">; // ["open.flag"]
export {};
