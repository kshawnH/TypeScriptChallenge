class Container {
  private instances = new Map(); // 所有的实例
  public properties = new Map(); // 存放那些属性对应的信息
  bind<T>(key: string, creator: () => T) {
    if (!this.instances.has(key)) {
      this.instances.set(key, creator());
    }
    console.log(this.instances);
  }
  resolve<T>(key: string): T {
    // 将记录的属性自动的注入到当前的实例上
    let instance = this.instances.get(key);

    for (let prop of this.properties) {
      // Computer-monitor => Monitor
      let [key, ServiceKey] = prop;
      let [className, propName] = key.split("-");

      // 检索是否是当前的类要进行注入
      //
      if (instance.constructor.name !== className) {
        continue;
      }
      //   computer.monitor = new Monitor
      //   computer.host = new new Host
      instance[propName] = this.resolve(ServiceKey); // 将主机和显示器自动的赋予到实例上
    }
    return instance;
  }
}

const container = new Container();

interface Monitor {}
interface Host {}

// 提供到容器中, 自动会创建实例在容器中
@Provide("Monitor")
class Monitor27inch implements Monitor {}
@Provide("Host")
class AppleHost implements Host {}

@Provide("Monitor32")
class Monitor32inch implements Monitor {}
@Provide("HostHp")
class HpHost implements Host {}

// DI 依赖注入， 不需要在类中硬编码
@Provide("Computer")
class Computer {
  @Inject("Monitor32")
  monitor!: Monitor32inch;
  @Inject("HostHp")
  host!: HpHost;
  bootstrap() {
    console.log("启动", this);
  }
}
function Provide(key: string) {
  return (target: any) => {
    // 存放  记录名 -》 实例
    debugger;
    container.bind(key, () => new target());
  };
}
function Inject(injectKey: string) {
  // 元数据起到了至关重要的作用
  return (target: object, key: string) => {
    // 当前在哪个原型上 注入了那些属性，做一个映射关系，稍后解析电脑的时候自己动解析他所依赖的属性
    debugger;
    // Computer-host -> HostHp -> 实例
    container.properties.set(`${target.constructor.name}-${key}`, injectKey);

    // 关联就是哪个类，对应的哪个属性，用哪个标识找到实例来进行赋值
  };
}
debugger;
const computer = container.resolve<Computer>("Computer");
computer.bootstrap();
export {};
