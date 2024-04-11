// @ts-nocheck
// 驼峰命名转横杠命名

// handle-open-flag 如何匹配大写字母？ Captialize<H> extends H

export type RmoveFirst<T, S extends string = ""> = T extends `${S}${infer V}`
  ? V
  : T;
export type KebabCase<
  T extends string,
  F extends string = ""
> = T extends `${infer L}${infer R}`
  ? // 这里处理当前字符是不是大写的 大写的就将它转化成 H -> -h
    KebabCase<R, `${F}${Capitalize<L> extends L ? `-${Lowercase<L>}` : L}`>
  : RmoveFirst<F, "-">;

type a1 = KebabCase<"HandleOpenFlag">; // handle-open-flag
type a2 = KebabCase<"OpenFlag">; // open-flag
export {};
