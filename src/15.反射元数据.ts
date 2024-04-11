import "reflect-metadata";

// class Animal {
//   static type = "动物";
//   eat() {}
// }
//                      key    value
// Reflect.defineMetadata("Class", "Animal metadata1", Animal);
// Reflect.defineMetadata("Class", "Animal metadata2", Animal);
// Reflect.defineMetadata("Class Property", "type metadata", Animal, "type");
// Reflect.defineMetadata("Proto method", "eat metadata", Animal.prototype, "eat");

/*
weakMap = {
    Animal:{
        undefiend: {"Class" : "Animal metadata"},
        "type" : {"Class Property" : "type metadata" }
    },
    Animal.prototype:{
        "eat": {"Proto method": "eat metadata"}
    }
}
*/

@Reflect.metadata("Class", "Animal metadata1")
class Animal {
  @Reflect.metadata("Class Property", "type metadata")
  static type = "动物";
  @Reflect.metadata("Proto method", "eat metadata")
  eat(a: string): number {
    return 123;
  }
}
console.log(Reflect.getMetadata("Class", Animal));
console.log(Reflect.getMetadata("Class Property", Animal, "type"));
console.log(Reflect.getMetadata("Proto method", Animal.prototype, "eat"));

console.log(Reflect.getMetadata("design:type", Animal.prototype, "eat"));
console.log(Reflect.getMetadata("design:paramtypes", Animal.prototype, "eat"));
console.log(Reflect.getMetadata("design:returntype", Animal.prototype, "eat"));

const animal = new Animal();

console.log(Reflect.getMetadata("design:type", animal, "eat"));
console.log(Reflect.getMetadata("design:paramtypes", animal, "eat"));
console.log(Reflect.getMetadata("design:returntype", animal, "eat"));
export {};
