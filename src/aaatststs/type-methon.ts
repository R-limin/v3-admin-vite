// // 内置方法--类型工具
// // 类型工具可以分成三类：  操作符 、 关键字 、 专用语法
// // 按照使用目的来划分，类型工具可以分为：    类型创建 | 类型安全保护
//   // type A = Partial<{}>; // Partial 即是内置的工具类

// //工具类型就像一个函数一样，泛型是入参，内部逻辑基于入参进行某些操作，再返回一个新的类型

//   // 类型创建    基于已有的类型创建新的类型的类型工具
//   // 它们的作用都是基于已有的类型创建新的类型，这些类型工具包括类型别名、交叉类型、索引类型与映射类型

// // 一.类型别名
// //#region
// type A = string;
// // eg: 抽离一组联合类型
// type StatusCode = 200 | 301 | 400 | 500 | 502;
// type PossibleDataTypes = string | number | (() => unknown);
// const statu: StatusCode = 502;
// // eg: 抽离一个函数类型
// type Handler = (e: Event) => void;
// const clickHandler: Handler = (e) => { };
// const moveHandler: Handler = (e) => { };
// const dragHandler: Handler = (e) => { };
// // eg: 声明一个对象类型，就像接口那样
// type ObjType = {
//  name: string;
//  age: number;
// }

// // 类型别名作为工具类型
// type Factory<T> = T | number | string;          //这个工具类型中，我们就简单接受了一个泛型，然后把它作为联合类型的一个成员，返回了这个联合类型
// const foo: Factory<boolean> = true;

// //一般不会直接使用工具类型来做类型标注，而是再度声明一个新的类型别名:
// type FactoryWithBool = Factory<boolean>;
// const foo: FactoryWithBool = true;

// // eg: 声明一个简单、有实际意义的工具类型
// // 这个工具类型会接受一个类型，并返回一个包括 null 的联合类型。
// //这样一来，在实际使用时就可以确保你处理了可能为空值的属性读取与方法调用:
// type MaybeNull<T> = T | null;
// function process(input: MaybeNull<{ handler: () => {} }>) {
//  input?.handler();
// }

// //#endregion

// //  二.联合类型与交叉类型
// //  |  &   或  与
// //#region
// // eg: 声明一个交叉类型
// interface NameStruct {
//   name: string;
// }

// interface AgeStruct {
//   age: number;
// }

// type ProfileStruct = NameStruct & AgeStruct;

// const profile: ProfileStruct = {
//   name: "linbudu",
//   age: 18
// }
// type StrAndNum = string & number; // never

// // #endregion
// //#region
// // 对于对象类型的交叉类型，其内部的同名属性类型同样会按照交叉类型进行合并
// type Struct1 = {
//   primitiveProp: string;
//   objectProp: {
//     name: string;
//   }
// }

// type Struct2 = {
//   primitiveProp: number;
//   objectProp: {
//     age: number;
//   }
// }

// type Composed = Struct1 & Struct2;

// type PrimitivePropType = Composed['primitiveProp']; // never
// type ObjectPropType = Composed['objectProp']; // { name: string; age: number; }
// // #endregion
// //#region
// // 联合类型
// type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
// type UnionIntersection2 = (string | number | symbol) & string; // string

// //#endregion

// // 三.索引类型（索引签名类型、索引类型查询、索引类型访问）
// // 1.索引签名类型（声明）主要指的是在接口或类型别名中，通过以下语法来快速声明一个键值类型一致的类型结构
// //#region
// interface AllStringTypes {
//   [key: string]: string;
// }

// type AllStringTypes = {
//   [key: string]: string;
// }

// type PropType1 = AllStringTypes['linbudu']; // string
// type PropType2 = AllStringTypes['599']; // string

// /***
// 但由于 JavaScript 中，对于 obj[prop] 形式的访问会将数字索引访问转换为字符串索引访问
// 也就是说， obj[599] 和 obj['599'] 的效果是一致的。
// 因此，在字符串索引签名类型中我们仍然可以声明数字类型的键。
// 类似的，symbol 类型也是如此
//  */
// const foo: AllStringTypes = {
//   "linbudu": "599",
//   599: "linbudu",
//   [Symbol("ddd")]: 'symbol',
// }

// interface AllStringTypes {
//   // 类型“number”的属性“propA”不能赋给“string”索引类型“boolean”。
//   propA: number;
//   [key: string]: boolean;
// }

// interface StringOrBooleanTypes {
//   propA: number;
//   propB: boolean;
//   [key: string]: number | boolean;
// }

// /**
// 索引签名类型的一个常见场景是
// 在重构 JavaScript 代码时，为内部属性较多的对象声明一个 any 的索引签名类型，
// 以此来暂时支持对类型未明确属性的访问，并在后续一点点补全类型：
// */
// interface AnyTypeHere {
//   [key: string]: any;
// }

// const foo: AnyTypeHere['linbudu'] = 'any value';
// //#endregion

// // 2.索引类型查询 （读取）   keyof 操作符
// //#region
// // keyof 的产物必定是一个联合类型。
// // 它可以将对象中的所有键转换为对应字面量类型，然后再组合成联合类型。
// // 注意，这里并不会将数字类型的键名转换为字符串类型字面量，而是仍然保持为数字类型字面量。
// interface Foo {
//   linbudu: 1,
//   599: 2
// }

// type FooKeys = keyof Foo; // "linbudu" | 599
// // 在 VS Code 中悬浮鼠标只能看到 'keyof Foo'
// // 看不到其中的实际值，你可以这么做：
// type FooKeys = keyof Foo & {}; // "linbudu" | 599

// //#endregion

// // 3.索引类型访问呢（读取）
// //#region
// // 这里，我们使用 string 这个类型来访问 NumberRecord。
// // 由于其内部声明了数字类型的索引签名，这里访问到的结果即是 number 类型。
// // 注意，其访问方式与返回值均是类型。
// interface NumberRecord {
//   [key: string]: number;
// }
// type PropType = NumberRecord[string]; // number

// // 下面例子看起来这里就是普通的值访问，但实际上这里的'propA'和'propB'都是字符串字面量类型，而不是一个 JavaScript 字符串值。
// // 索引类型查询的本质其实就是，通过键的字面量类型（'propA'）访问这个键对应的键值类型（number）
// interface Foo {
//   propA: number;
//   propB: boolean;
// }
// type PropAType = Foo['propA']; // number
// type PropBType = Foo['propB']; // boolean

// // 使用字面量联合类型进行索引类型访问时，其结果就是将联合类型每个分支对应的类型进行访问后的结果，重新组装成联合类型
// interface Foo {
//   propA: number;
//   propB: boolean;
//   propC: string;
// }

// type PropTypeUnion = Foo[keyof Foo]; // string | number | boolean

// //#endregion

// // 映射类型    基于键名映射到键值类型
// //#region
// /**
//  * 这个工具类型会接受一个对象类型（假设我们只会这么用）,
//  * 使用 keyof 获得这个对象类型的键名组成字面量联合类型,
//  * 然后通过映射类型（即这里的 in 关键字）将这个联合类型的每一个成员映射出来，并将其键值类型设置为 string。
// */
// type Stringify<T> = {
//   [K in keyof T]: string;
// };
// interface Foo {
//   prop1: string;
//   prop2: number;
//   prop3: boolean;
//   prop4: () => void;
// }
// type StringifiedFoo = Stringify<Foo>;
// // 等价于
// interface StringifiedFoo {
//   prop1: string;
//   prop2: string;
//   prop3: string;
//   prop4: string;
// }
// /**
//  * 下面这里的T[K]其实就是上面说到的索引类型访问，
//  * 我们使用键的字面量类型访问到了键值的类型，这里就相当于克隆了一个接口。
//  * 需要注意的是，这里其实只有
//  * K in 属于映射类型的语法，
//  * keyof T 属于 keyof 操作符，
//  * [K in keyof T]的[]属于索引签名类型，
//  * T[K]属于索引类型访问
// */
// type Clone<T> = {
//   [K in keyof T]: T[K];
// };
// type mapFoo = Clone<Foo>;
// //#endregion
