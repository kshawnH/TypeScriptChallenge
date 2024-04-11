// 首字母大写

// ---------------------------------

export type CapitalizeString<T> = T extends string ? `${Capitalize<T>}` : T;

// 默认情况 字符串的infer只匹配一个字节
// 针对字符的infer 默认 infer第一个指代的是第一个字节, 后面的就是所有的
// 如果有分隔符号，指代的是分隔符之前的
// export type CapitalizeString<T> = T extends `${infer L}n${infer R}${infer R1}`
//   ? `${Capitalize<L>}${R}`
//   : T;
type a1 = CapitalizeString<"handler">; // Handler
type a2 = CapitalizeString<"parent">; // Parent
type a3 = CapitalizeString<233>; // 233

export {};
