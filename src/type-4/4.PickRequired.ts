import { OptionalKeys } from "./1.OptionalKeys";

type PickRequired<T extends object> = Omit<T, OptionalKeys<T>>;
type a1 = PickRequired<{
  foo: number | undefined;
  bar?: string;
  flag: boolean;
}>; // {foo:number|undefined,flag:boolean}
type a2 = PickRequired<{ foo: number; bar?: string }>; // {foo:number}
type a3 = PickRequired<{ foo: number; flag: boolean }>; // {foo:number,flag:boolean}
type a4 = PickRequired<{ foo?: number; flag?: boolean }>; // {}
type a5 = PickRequired<{}>; // {}

export {};
