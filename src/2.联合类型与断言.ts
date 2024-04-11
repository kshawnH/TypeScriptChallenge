// 以赋予值的结果 来推导内容

// let name = "jiangwen";
// let age = 30;

// let const 区别
// const age = 30; // 如果用常量 来自动推导类型就是字面类型

let name: string | number;

// 默认没有赋值的时候 联合类型可以调用公共的方法 , why? 为了安全 所以只能访问公共的属性

name = "jiangwen";
name.toUpperCase();
name = 30;
name.toFixed(); // 赋值后会推断类型

// 联合类型 一般我们会基于联合类型 来扩展额外的类型

// 字面量类型 . type 可以声明一个类型
type Direction = "up" | "down" | "right" | "left"; // ts 写法

let direction: Direction = "left";

// type 中定义的是类型 不是js 中对象
type women =
  | {
      wealthy: true;
      waste: string;
    }
  | {
      wealthy: false;
      norality: string;
    };

let richWoman: women = {
  wealthy: true,
  waste: "购物和消费",
};
let poorWoman: women = {
  wealthy: false,
  norality: "勤俭持家",
};
// 可以利用联合类型来做到属性之间的互斥 （可辨识联合类型）

// 断言 (非空断言, 这个值一定不为空， 绕过ts检测了)
// let ele: HTMLElement | null = document.getElementById("app");
// ele!.style.background = "red"; // ts

// as 断言 可以强制把某个类型断言成已经存在的某个类型

let ele: HTMLElement | null = document.getElementById("app");
(ele as HTMLElement).style.background = "red";
(<HTMLElement>ele).style.background = "red"; // 不推荐会和jsx 语法冲突

ele?.style.background; // js 可选链操作符号
// false ?? 1; 空值合并操作符号，除了 null 和 undefiend 都会返回左边的值

// 断言出问题了，后果需要自负，  有可能会出问题（你觉得不会出问题）

// 双重断言 我们可以把一个值 断言成any 在断言成某个类型
// any 类型可以赋予给任何类型

let str: string | number | boolean;

str! as boolean as true;
export {};
