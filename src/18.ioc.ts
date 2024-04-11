// 控制反转 、 依赖注入

// 什么是控制正转， 控制权是交给自己的，自己来处理整个流程
// 什么是反转， 我失去了控制权，全部在内部自己来做的

// ioc 将所有的创建过程全部交给”容器“来做， 可以解决类之间的耦合问题

interface Monitor {}
interface Host {}
class Monitor27inch implements Monitor {}
class AppleHost implements Host {}

// class Computer {
//   public monitor = new Monitor27inch();
//   public host = new AppleHost();
//   boostrap() {
//     console.log("启动电脑", this);
//   }
// }
class Computer {
  constructor(public monitor: Monitor, public host: Host) {}
  boostrap() {
    console.log("启动电脑", this);
  }
}
let monitor = new Monitor27inch();
let host = new AppleHost();
const computer = new Computer(monitor, host);

// 控制反转将实例化的过程交给容器
class Container {
  private instances = new Map(); // 所有的实例
  bind<T>(key: string, creator: () => T) {
    if (!this.instances.has(key)) {
      this.instances.set(key, creator());
    }
  }
  resolve(key: string) {
    return this.instances.get(key);
  }
}

const container = new Container();
container.bind<Monitor>("Monitor", () => new Monitor27inch());
container.bind<Host>("Host", () => new AppleHost());

container.bind<Computer>(
  "Computer",
  () => new Computer(container.resolve("Monitor"), container.resolve("Host"))
);
computer.boostrap();

export {};
