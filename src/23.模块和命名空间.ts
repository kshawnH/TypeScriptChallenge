// 模块和命名空间

// 模块 叫外部模块，  命名空间 叫内部模块 (用的比较少)

// 1) --------
// 目前我们主要采用 es6 的模块来创建作用域 （按照文件）来划分的、 import | export

// import a from "./a";

// import r from "./a";

// import x = require("./a");

// console.log(r);
// 常见的模块规范 esm（es6模块）  amd(define) 、cmd(commonjs 规范)
// 不能转化的：
// commonjs 规范 -》 amd规范
// commonjs 规范 -》 esm规范

// 模块不会混用，在es6下引用commonjs 规范的模块不合适

// 在ts语法中中有一种模块化方式  (export =  | import xx = )

// 开发全部采用 import export
// 写声明文件的时候，如果模块是commonjs ， 或者想快速的导出一个值可以采用ts语法

// export  = 'abc'
// import x = require("xxxx")
// 使用时可以采用es模块的方式导入

// 2) --------

import { Zoo, Home } from "./module-a";

console.log(Zoo.cat, Zoo.dog, Zoo.monkey);
console.log(Home.dog);
console.log(Home.X.dog);
