// 将联合类型转换为交叉类型
type A = UnionToIntersection<{ a: string } | { b: string } | { c: string }>;
// {a: string} & {b: string} & {c: string}

// 知不知道"逆变"与协变  逆变参数可以传父亲
type UnionToIntersection<T> = (T extends any ? (p: T) => any : false) extends (
  p: infer P
) => any
  ? P
  : never;

// {a:string,b:string,c:string}

// (val:{ a: string })=>any
// (val:{ b: string })=>any
// (val:{ c: string })=>any
