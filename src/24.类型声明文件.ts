// 类型声明
// 有些代码使用cdn 引入的， 或者有些包使用js 来写的没有提示， 有些模块导入的格式不是js或者ts

// 添加声明文件 为了统一管理而且不影响核心代码， 我们将声明的内容都放入到.d.ts文件中
// 我们写好的内容放到.d.ts 中 ， ts默认会检测当前项目下所有的.d.ts 文件
console.log(age);

let a = sum("a", "b");

// $("abvc").width(100).height(100);

$(".xxxx").height(100).width(100);
$.fn.extend;
$.ajax;
// mitt

// import mitt from "mitt";

// mitt.on("data", function () {});
// mitt.emit("data", "a", "b", "c");

// 非js 或者ts 后缀的模块

// import jpg from "a.jpg";

// 我们在查找第三方模块是如何查找的

// import xxx from "mitt";

// node_modules/xxx/package.json  -> types
// node_modules/xxx/index.d.ts
// node_modules/@types/index.d.ts  如果当前模块不是ts写的，有些声明文件是别人写好的我们可以安装

// jquery  -> @types/jquery

import _ from "lodash";
