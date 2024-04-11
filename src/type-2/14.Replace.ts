// 构建一个查找规则，找到后将 左边 和 右边 留起来 ${infer L}${C}${infer R}   ${F}${L}${RC} , R 需要继续递归

type Replace<
  T extends string,
  C extends string,
  RC extends string,
  F extends string = ""
> = C extends "" // 特殊情况优先考虑
  ? T extends ""
    ? RC
    : `${RC}${T}`
  : T extends `${infer L}${C}${infer R}` // 根据分隔符来进行替换
  ? Replace<R, C, RC, `${F}${L}${RC}`> // 将剩余的部分继续替换
  : `${F}${T}`;

type a1 = Replace<"ha ha ha 111", "ha", "he">;
type a2 = Replace<"jw", "jw", "jiangwen">;
type a3 = Replace<"a", "", "jiangwen">; // jiangwena
type a4 = Replace<"", "", "jiangwen">;

// 下次实现, 尝试实现以下replace
export {};
