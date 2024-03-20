// // 函数的类型就是描述了函数入参类型与函数返回值类型

// // 函数声明（Function Declaration）
// function fo(name: string): number {
//   return name.length
// }
// // 函数表达式（Function Expression）
// const foo = function (name: string): number {
//   return name.length
// }
// // 函数类型签名
// const fooo: (name: string) => number = function (name) {
//   return name.length
// }

// // 箭头函数
// // 方式一
// const ffo = (name: string): number => {
//   return name.length
// }
// // 方式二   函数类型声明混合箭头函数声明, 可读性差，不推荐
// const ffoo: (name: string) => number = (name) => {
//   return name.length
// }

// // 使用类型别名将函数声明抽离出来
// type FuncFoo = (name: string) => number
// const foo1: FuncFoo = (name) => {
//   return name.length
// }

// // 只是为了描述这个函数的类型结构
// interface FuncFooStruct {
//   (name: string): number
// }

// // void类型
// //#region
// // 一个没有返回值（即没有调用 return 语句）的函数，其返回类型应当被标记为 void 而不是 undefined，即使它实际的值是 undefined。
// // 在 TypeScript 中，undefined 类型是一个实际的、有意义的类型值，而 void 才代表着空的、没有意义的类型值。
// // 在我们没有实际返回值时，使用 void 类型能更好地说明这个函数没有进行返回操作。

// // 没有调用 return 语句
// function foo2(): void { }

// // 调用了 return 语句，但没有返回值
// function bar(): void {
//   return;
// }
// // 更好的方式是使用 undefined  表示进行了返回操作，但没有返回实际的值。
// function bar1(): undefined {
//   return;
// }

// //#endregion

// // 可选参数
// //#region
// // 在函数逻辑中注入可选参数默认值
// function foo3(name: string, age?: number): number {
//   const inputAge = age ?? 18;
//   return name.length + inputAge
// }

// // 直接为可选参数声明默认值
// function foo4(name: string, age: number = 18): number {
//   const inputAge = age;
//   return name.length + inputAge
// }
// //#endregion

// // rest参数
// //#region
// function foo5(arg1: string, ...rest: any[]) {}
// function foo6(arg1: string, ...rest: [number, boolean]) { }

// foo6("ling", 18, true)

// //#endregion

// //重载
// //#region
// // 函数可能有多组入参类型和返回值类型
// // 这里类型签名完全没有体现这一点，我们只知道它的返回值是这么个联合类型
// function func1(foo: number, bar?: boolean): string | number {
//   if (bar) {
//     return String(foo);
//   } else {
//     return foo * 599;
//   }
// }

// //函数重载签名（Overload Signature）
// // 以上例子使用重载改写
// function func(foo: number, bar: true): string;                       //重载签名一，传入 bar 的值为 true 时，函数返回值为 string 类型。
// function func(foo: number, bar?: false): number;                     //重载签名二，不传入 bar，或传入 bar 的值为 false 时，函数返回值为 number 类型。
// function func(foo: number, bar?: boolean): string | number {         //函数的实现签名，会包含重载签名的所有可能情况。
//   if (bar) {
//     return String(foo);
//   } else {
//     return foo * 599;
//   }
// }

// const res1 = func(599); // number
// const res2 = func(599, true); // string
// const res3 = func(599, false); // number
// //#endregion

// //异步函数
// //#region
// async function asyncFunc(): Promise<void> {}
// //#endregion
