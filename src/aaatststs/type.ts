// any 任意类型  unknown 不知道的类型
// 1. top type 顶级类型  any  unknown
// 2. Object
// 3. Number String Boolean
// 4. number string boolean
// 5. 1  '字符串' false
// 6. never

// ^_
// //原始类型的类型标注
// // #region
// const name1: string = "linbudu"
// const age: number = 24
// const male: boolean = false
// const undef: undefined = undefined
// const nul: null = null
// const obj: object = { name, age, male }
// const bigintVar1: bigint = 9007199254740991n
// const bigintVar2: bigint = BigInt(9007199254740991)
// const symbolVar: symbol = Symbol("unique")
// // #endregion

// // null & undefined
// // #region
// const tmp1: null = null
// const tmp2: undefined = undefined

// // const tmp3: string = null // 仅在关闭 strictNullChecks 时成立
// // const tmp4: string = undefined  // 仅在关闭 strictNullChecks 时成立
// // #endregion

// // void
// // #region
// // const voidVar1: void = undefined;
// // const voidVar2: void = null; // 需要关闭 strictNullChecks
// // #endregion

// // 数组类型
// // #region
// const arr1: string[] = []
// const arr2: Array<string> = []
// // #endregion

// //元组tuple
// // #region
// const arr3: string[] = ["lin", "bu", "du"]
// console.log(arr3[599]) //[数组显式地越界访问x]

// const arr4: [string, string, string] = ["lin", "bu", "du"]
// console.log(arr4[599])

// const arr5: [string, number, boolean] = ["linbudu", 599, true]

// // 支持可选
// const arr6: [string, number?, boolean?] = ["linbudu"]
// const arr66: [string, number?, boolean?] = ["linbudu", , ,] //在 --strictNullCheckes 配置下
// type TupleLength = typeof arr6.length // 1 | 2 | 3

// // 具名元组（Labeled Tuple Elements）
// const arr7: [name: string, age: number, male: boolean] = ["linbudu", 599, true]
// const arr77: [name: string, age: number, male?: boolean] = ["linbudu", 599, true]

// const arr11: string[] = []
// const [ele1, ele2, ...rest] = arr1 //[x]数组隐式地越界访问

// // const arr5: [string, number, boolean] = ['linbudu', 599, true];
// // 长度为 "3" 的元组类型 "[string, number, boolean]" 在索引 "3" 处没有元素。
// const [name11, age, male, other] = arr5
// // #endregion

// //对象
// // #region
// interface IDescription {
//   readonly name: string
//   age: number
//   male?: boolean
//   func?: Function
// }

// const obj2: IDescription = {
//   name: "linbudu",
//   age: 599,
//   male: true
//   // 无需实现 func 也是合法的
// }

// obj2.name = "limin"
// //#endregion

// //Object
// // Object 包含了所有的类型
// // 对于 undefined、null、void 0 ，需要关闭 strictNullChecks
// // #region
// const tmp1: Object = undefined;
// const tmp2: Object = null;
// const tmp3: Object = void 0;

// const tmp4: Object = 'linbudu';
// const tmp5: Object = 599;
// const tmp6: Object = { name: 'linbudu' };
// const tmp7: Object = () => {};
// const tmp8: Object = [];
// // #endregion

// // Object、Boolean、Number、String、Symbol   //装箱类型（Boxed Types）
// //#region
// const tmp9: String = undefined;
// const tmp10: String = null;
// const tmp11: String = void 0;
// const tmp12: String = 'linbudu';

// // 以下不成立，因为不是字符串类型的拆箱类型
// const tmp13: String = 599; // X
// const tmp14: String = { name: 'linbudu' }; // X
// const tmp15: String = () => {}; // X
// const tmp16: String = []; // X

// //#endregion

// // 在任何情况下，你都不应该使用这些装箱类型。
// // object 的引入就是为了解决对 Object 类型的错误使用，它代表所有非原始类型的类型，即数组、对象与函数类型这些
// //#region
// const tmp17: object = undefined;
// const tmp18: object = null;
// const tmp19: object = void 0;

// const tmp20: object = 'linbudu';  // X 不成立，值为原始类型
// const tmp21: object = 599; // X 不成立，值为原始类型

// const tmp22: object = { name: 'linbudu' };
// const tmp23: object = () => {};
// const tmp24: object = [];
// //#endregion

// // 最后，为了更好地区分 Object、object 以及{}这三个具有迷惑性的类型，我们再做下总结：
// // 在任何时候都不要，不要，不要使用 Object 以及类似的装箱类型。

// // 当你不确定某个变量的具体类型，但能确定它不是原始类型，可以使用 object。但我更推荐进一步区分，
// // 也就是使用
// // Record<string, unknown> 或 Record<string, any> 表示对象，
// // unknown[] 或 any[] 表示数组，
// // (...args: any[]) => any表示函数
// // 这样。

// // 我们同样要避免使用{}。{}意味着任何非 null / undefined 的值，从这个层面上看，使用它和使用 any 一样恶劣。

// // 字面量类型与联合类型
// //#region
// interface Res {
//   code: 10000 | 10001 | 50000
//   status: "success" | "failure"
//   data: any
// }
// declare const res: Res

// if (res.status === "failure") {
//   console.log(res.status)
// }

// // 联合类型常用场景
// // 通过多个对象类型的联合，来实现手动的互斥属性，即这一属性如果有字段1，那就没有字段2
// interface Tmp {
//   //也还是合法的联合类型表达式，主要是为了格式化美观所以前面加了个|
//   user:
//     | {
//         vip: true
//         expires: string
//       }
//     | {
//         vip: false
//         promotion: string
//       }
// }

// declare const tmp: Tmp

// if (tmp.user.vip) {
//   console.log(tmp.user.expires)
// }
// //#endregion
