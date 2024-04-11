// 模板字符串类型 类似于 js中es6的模板字符串

// 可以将多个字符串类型进行组装

type name = "jiangwen";
type age = 30;
type sayName = `handsome, ${name} ${age}`; // 就是es6模板字符串 ， 产生的结果是一个字符串类型

// 模板字符串也是具备分发能力

// margin-top margin-bottom margin-right margin-left
type Direction = "top" | "bottom" | "right" | "left";

type AllMargin = `margin-${Direction}`;
type AllPadding = `padding-${Direction}`;

// 购物 sku  1.0，2.0，3.0  20，30，40

type IR = "1.0" | "2.0" | "3.0";
type IL = 20 | 30 | 40;
type IRL = `${IR}-${IL}`;

// 放到字符串内的东西 需要约束，必须得能转化成字符串
type sayHello<T extends string | boolean | null | undefined | number | bigint> =
  `hello , ${T}`;
// type sayHello<T> = `hello , ${T & string}`; // 有的时候可以偷懒，直接采用此方案来解析
type R1 = sayHello<"jiang">;
type R2 = sayHello<30>; // 以上都是字面量
type R3 = sayHello<number>; // 可以传递基础类型

type IFlag = R2 extends R3 ? true : false; // 所有的基础类型的模板字符串都是字面量类型的父类型（类型相同）

// 将对象的属性进行重命名操作  {name,age,address} -> {r_name,r_age,r_address}

type Person = {
  name: string;
  age: number;
  address: string;
};
type ReType<T> = {
  // 模板字符串进行变量的重命名操作
  [K in keyof T as `r_${Uppercase<K & string>}`]: T[K];
};
type x = ReType<Person>;

// 字符串可以支持工具类型 Uppercase、LowerCase、 Capitalize、 UnCapitalize、

let person: Person = { name: "jw", age: 30, address: "北京" };
type WithGetter<T> = {
  [K in keyof T as `get${Capitalize<K & string>}`]?: () => T[K];
};

type Compute<T> = { [K in keyof T]: T[K] };
type WithGetterType = Compute<WithGetter<Person>>;
let personGetter: WithGetterType = {
  getName() {
    return person.name;
  },
  getAge() {
    return person.age;
  },
  getAddress() {
    return person.address;
  },
};
// 根据模式匹配符来取类型  jiang wen
// infer 可以进行位置推断
// 可以推断数组 | 元组 | string
type GetNameFirstChar<T> = T extends `${infer F} ${infer X}` ? F : never;
type FirstChar = GetNameFirstChar<"jiang wen">; // 可以通过infer 来进行字符串的位置推断，符合即可推断（中间可以配置分隔符）

export {};
