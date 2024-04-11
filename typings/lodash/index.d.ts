/// <reference path="./lodash_a.d.ts"/>


// types=“node”  可以指定引入的某个内置包 (第三方)
// lib="dom" 可以指定依赖的内置ts声明
 
// 三斜线指令， 类似于在声明文件中引入其他的声明文件 （只能放在最上面）
declare namespace _ {
    //扩展一些不需要暴露的类型
    interface ILodash {
      a(): void;
      b(): void;
      c(): void;
    }
}
declare const _: _.ILodash
//  写成模块后，就不能直接用了，需要导入后再用
export = _
export as namespace _ // 当前模块可以不导入直接使用(在不是作用域的文件中可以直接使用，umd模块)

