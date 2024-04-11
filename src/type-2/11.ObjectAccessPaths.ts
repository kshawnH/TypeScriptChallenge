// 得到对象中的值访问字符串

import { RmoveFirst } from "./9.KebabCase";

// 'home' | 'login'
export type ObjectAccessPaths<
  T,
  F extends string = "",
  K = keyof T

  // 这里目的是为了将联合类型K，进行分发分别取值
> = K extends keyof T
  ? T[K] extends object
    ? //  如果当前的值是对象继续递归拼接， 并且将当前解析的key 拼接到结果集中
      ObjectAccessPaths<T[K], `${F}.${K & string}`>
    : RmoveFirst<`${F}.${K & string}`, "."> // 这里会丢失不是对象的最后一个key，需要加入到结果集中
  : never;

function createI18n<Schema>(
  schema: Schema
): (path: ObjectAccessPaths<Schema>) => void {
  return (path) => {};
}
const i18n = createI18n({
  home: {
    topBar: {
      title: "顶部标题",
      welcome: "欢迎登录",
    },
    bottomBar: {
      notes: "XXX备案，归XXX所有",
    },
  },
  login: {
    username: "用户名",
    password: "密码",
  },
});

i18n("home.topBar.title"); // correct
i18n("home.topBar.welcome"); // correct
i18n("home.bottomBar.notes"); // correct

// i18n("home.login.abc"); // error，不存在的属性
// i18n("home.topBar"); // error，没有到最后一个属性
export {};
