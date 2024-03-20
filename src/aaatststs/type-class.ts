// class的类型   构造函数、属性、方法和访问符（Accessor）
//类声明
export class Fo {
  prop: string

  constructor(inputProp: string) {
    this.prop = inputProp
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }

  get propA(): string {
    return `${this.prop}+A`
  }

  set propA(value: string) {
    this.prop = `${value}+A`
  }
}

// 类表达式
export const Foo = class {
  prop: string

  constructor(inputProp: string) {
    this.prop = inputProp
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }

  // ...
}

// ......看不懂
