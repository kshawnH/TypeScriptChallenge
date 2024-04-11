// @ts-nocheck

import { CamelCase } from "./10.CamelCase";

// 定义组件的监听事件类型

type a1 = {
  "handle-open": (flag: boolean) => true;
  "preview-item": (data: { item: any; index: number }) => true;
  "close-item": (data: { item: any; index: number }) => true;
};

type ComponentEmitsType<T> = {
  [K in keyof T as `on${CamelCase<K>}`]: T[K] extends (...args: infer P) => any
    ? (...args: P) => void // 将返回值改造成了void
    : never;
};

type a2 = ComponentEmitsType<a1>;
// 转化为类型
/*
{
    onHandleOpen?: (flag: boolean) => void,
    onPreviewItem?: (data: { item: any, index: number }) => void,
    onCloseItem?: (data: { item: any, index: number }) => void,
}
*/

export {};
