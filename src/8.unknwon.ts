// unknown 是any的安全类型， 泛型没有赋予值的时候 默认就是unknown

let val: unknown = true;

// 默认情况下 unknown 必须要现进行类型检测才能使用  （类型检查、类型断言）

function processInput(val: unknown) {
  if (typeof val === "string") {
    val.toUpperCase();
  } else if (typeof val === "number") {
    val.toFixed();
  }
}
let name: unknown = "JIANGWEN";
(name as string).toUpperCase();

// unknown 在联合类型中和交叉类型中的特点
type Unionunknown = unknown | string | null | undefined; // unknown 和任何类型 做联合类型都是unknown

type Internunknown = unknown & string; // 获取的类型是string, 如果是any 则返回的是any

// 区分类型是unknwon 还是any 可以采用交叉类型

type IKeyOf = keyof unknown; // 不能用keyof 来取unkown的类型
// keyof any (string number symbol 可以充当key)

export {};
