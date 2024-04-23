/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

// any 任意类型  unknown 不知道的类型
// 1. top type 顶级类型
//    any 可以赋值被赋值
//    unknown不可以赋值给别的类型 只能赋值给自身或any类型   没有办法读任何属性 不可调用方法   比any更加安全

// 2. Object
// Object & object & {}
// Object     ts中表示包含了所有类型
// object 表示非原始类型的任意对象类型 引用类型  常用于泛型约束
// {} 等于new Object     表示空对象类型  空对象类型可以赋值给任意对象类型  常用于函数返回值类型

// 任意对象类型  任意对象类型  空对象类型

// 3. Number String Boolean  包装类型    构造器
// 4. number string boolean
// 5. 1  '字符串' false
// 6. never

//#region  interface
// interface  重名  重合
// interface  任意key
// interface  ?  readonly
// interface  接口继承
// interface  定义函数类型
interface Animal extends Person {
  name: string
  age?: number // 可选属性
  run(): void
  readonly boo: () => boolean // 函数类型  只读属性
  readonly id: number // 只读属性
  [propName: string]: any //索引签名    不会校验没有定义的属性
}
interface Person {
  sex: string
  say(): void
}

const cat: Animal = {
  name: "Tom",
  // age: 18,
  sex: "male", // 接口继承的属性必须实现
  id: 1,
  boo() {
    return true
  },
  a: 1,
  b: 2,
  c: 3,
  run() {
    console.log("Tom is running")
  },
  say() {
    console.log("接口继承的say")
  }
}
//#endregion

//#region   数组
// ==========定义普通数组类型
const arr: number[] = [1, 2, 3]
const arr2: Array<number> = [1, 2, 3]
const arr3: Array<string | number> = [1, "2", 3]
// ==========定义对象数组类型使用interface
interface PersonObj {
  name: string
  age: number
}
const arr4: PersonObj[] = [
  { name: "Tom", age: 18 },
  { name: "Jerry", age: 20 },
  { name: "Lily", age: 16 }
]

// ==========定义多维数组
const arrarr: number[][] = [
  //推荐写法number[][]
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
const arrarr2: Array<Array<number>> = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
// 大杂烩数组 或者用元组
const arrAll: [number, string, boolean, {}] = [1, "2", true, { a: 1, b: 2 }]

// ==========定义元组类型
const tuple: [string, number] = ["hello", 1]

// 定义函数剩余参数类型
function a(...arg: string[]) {
  console.log(...arg)
  // const a: IArguments = arguments
}
a("1", "2")

//#endregion

//#region   函数
// ==========定义函数类型
// 函数定义类型和返回值  默认值
// 可选参数不能有默认值
function add(a: number = 10, b?: number): number {
  // return a + b   //严格模式下可选参数会报错
  return a
}
add() // 30
add(1, 2) // 3
add(10) // 30
// 箭头函数定义类型和返回值
const add2 = (a: number, b: number): number => a + b

// 定义函数类型（参数是对象）
// 使用interface 定义
interface PersonFunc {
  name: string
  age: number
}
function sayHello(person: PersonFunc): void {
  console.log(`Hello, ${person.name}, ${person.age}`)
}
sayHello({ name: "Tom", age: 18 })

// 增强---- 函数this类型
interface Obj {
  user: number[]
  addObj: (this: Obj, num: number) => void
}
// ts可以定义this的类型，  在js中无法使用   必须是第一个参数定义this的类型
const objobj: Obj = {
  user: [1, 2, 3],
  addObj(this: Obj, num: number) {
    this.user.push(num)
  }
}
objobj.addObj(4)
console.log(objobj.user) // [1]

// 函数重载
const dog: number[] = [1, 2, 3]
function findDog(add: number[]): number[] //如果传的是一个number类型的数组那就做添加
function findDog(id: number): number[] //如果传入了ID那就是单个查询
function findDog(): number[] //如果没有传入东西那就是查询全部
function findDog(ids?: number | number[]): number[] {
  if (typeof ids === "number") {
    return dog.filter((item) => item === ids)
  } else if (Array.isArray(ids)) {
    dog.push(...ids)
    return dog
  } else {
    return dog
  }
}

//#endregion

//#region
// 联合类型 |
// 交叉类型 &
// 类型断言
const fnn = function (num: string | number): void {
  console.log((num as string).length) // 类型断言  强制转换类型 js中不支持类型断言
  console.log((<string>num).length) //类型断言第二种写法
}
fnn("12345") //5
fnn(12) //undefined     //类型断言只能欺骗编译器，不能改变运行结果，滥用可能会导致报错
;(window as any).abc = 123 //临时断言

// 不要滥用类型断言
const ffn = (type: any): boolean => {
  return type as boolean
}
const xxx = ffn(1)
console.log(xxx) //结果为1  不是true     //类型断言只能欺骗编译器，不能改变运行结果，滥用可能会导致报错
//#endregion

// #region    内置类型
const num: Number = new Number(123)
const date: Date = new Date()
const reg: RegExp = new RegExp("\\d+")
const error: Error = new Error("错了")
const xhr: XMLHttpRequest = new XMLHttpRequest()

const div: NodeListOf<HTMLDivElement | HTMLElement> = document.querySelectorAll("div footer")

// 浏览器相关
const local: Storage = window.localStorage
const session: Storage = window.sessionStorage
const lo: Location = window.location
const cookie: string = document.cookie
const promise: Promise<string> = new Promise((r) => r("啦啦啦"))
// #endregion

//#region   Class  虚拟dom的demo
interface Options {
  el: string | HTMLElement
}
interface VueCls {
  options: Options
  init(): void
}

interface Vnode {
  tag: string
  text?: string
  children?: Vnode[]
}
// 虚拟dom 简单版
// 1. class基本用法 extends 继承  implements 类型约束
// 2. class的修饰符
//      readonly-只读属性
//      static-静态属性-static只能调static的方法
//      public-公共属性-默认
//      private-私有属性-只能在内部使用
//      protected-受保护属性-给子类和内部使用
// 3. super() 调用父类构造函数  初始化父类现有父再有子
//    父类的prototype.constructor.call
// 4. get  set  访问器
class Dom {
  constructor() {} //super() 调用父类的prototype.constructor.call
  // 创建节点的方法
  private createElement(el: string) {
    return document.createElement(el)
  }
  // 填充文本的方法
  private setText(el: HTMLElement, text: string | null) {
    el.textContent = text
  }
  // 渲染函数
  protected render(data: Vnode) {
    const root = this.createElement(data.tag)
    if (data.text) {
      this.setText(root, data.text)
    }
    if (data.children && Array.isArray(data.children)) {
      data.children.forEach((child) => {
        const childEl = this.render(child)
        root.appendChild(childEl)
      })
    }
    // else {
    //   this.setText(root, data.text)
    // }
    return root
  }
}

// extends继承Dom类 super()
// implements关键字  用来约束class类
class Vue extends Dom implements VueCls {
  options: Options
  constructor(options: Options) {
    super() //父类的prototype.constructor.call
    this.options = options
    this.init()
  }
  static version: string = "1.0.0"
  static versionFn() {
    return this.version
  }
  init(): void {
    // 虚拟dom 就是通过js  去渲染我们这个真实dom
    const data: Vnode = {
      tag: "div",
      children: [
        {
          tag: "section",
          text: "我是子节点1"
        },
        {
          tag: "section",
          text: "我是子节点2"
        },
        {
          tag: "section",
          text: "我是子节点3"
        }
      ]
    }
    const app = typeof this.options.el == "string" ? document.querySelector(this.options.el) : this.options.el
    app?.appendChild(this.render(data))
  }
}

//#endregion

//#region   get  set  访问器
new Vue({
  el: "#app"
})

// get  set  访问器
class Ref {
  _value: any
  constructor(value: any) {
    this._value = value
  }
  get value() {
    return this._value + "getgetget"
  }
  set value(newVal) {
    this._value = newVal + "setsetset"
  }
}
const ref = new Ref("123")
console.log(ref.value) // "123getgetget"
ref.value = "456" // "456setsetset"

// Q: 为什么读value而不是_value？
// A: 因为_value是私有属性，外部代码不能直接访问，只能通过get和set方法访问。
//  为了保证对象的内聚和原子性，不对外暴露过多的类的特性，只提供必要的描述

//#endregion
