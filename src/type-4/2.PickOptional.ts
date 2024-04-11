// 保留一个对象中的可选属性类型

import { OptionalKeys } from "./1.OptionalKeys";

type PickOptional<T extends object> = Pick<T, OptionalKeys<T>>;

type a2 = PickOptional<{ foo: number; bar?: string }>; // {bar?:string}
type a3 = PickOptional<{ foo: number; flag: boolean }>; // {}
type a4 = PickOptional<{ foo?: number; flag?: boolean }>; // {foo?:number,flag?:boolean}
type a5 = PickOptional<{}>; // {}

export {};
