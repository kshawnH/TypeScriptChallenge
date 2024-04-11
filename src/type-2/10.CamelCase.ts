// @ts-nocheck
// 横杠命名转化为驼峰命名

export type CamelCase<
  T extends string,
  F extends string = ""
> = T extends `${infer L}-${infer R1}${infer R2}`
  ? //   pen-flag 继续转换  handle + O +  pen + F
    CamelCase<R2, `${F}${L}${Capitalize<R1>}`>
  : `${Capitalize<`${F}${T}`>}`;

type a1 = CamelCase<"handle-open-flag">; // HandleOpenFlag
type a2 = CamelCase<"open-flag">; // OpenFlag
export {};
