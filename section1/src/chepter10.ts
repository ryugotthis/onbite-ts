// 조건부 타입

import { extname } from 'path';

type A = number extends string ? string : number; // number

type ObjA = {
  a: number;
};
type ObjB = {
  a: number;
  b: number;
};
type B = ObjB extends ObjA ? number : string; // number

// 제네릭과 조건부 타입 - 자주 사용됨
type StringNumberSwitch<T> = T extends number ? string : number;
let varA: StringNumberSwitch<string>;

// 함수 오버로딩
// function removeSpace<T>(text: T): T extends string ? string : undefined{
//   // T가 뭔지 확정되지 않았기 때문에 TypeScript는 안전하게 타입을 보장할 수 없음
//   if (typeof text === 'string') {
//          return text.replaceAll(' ', '');
//        } else {
//         return undefined;
//        }
// }

function removeSpace<T>(text: T): T extends string ? string : undefined; // 선언부
function removeSpace(text: any) {
  // 구현부
  if (typeof text === 'string') {
    return text.replaceAll(' ', '');
  } else {
    return undefined;
  }
}

let result = removeSpace('hi im winterlood');
result.toUpperCase();
let result2 = removeSpace(undefined);

// 분석적인 조건부 타입
let c: StringNumberSwitch<number | string>;

let d: StringNumberSwitch<boolean | number | string>;

// 실용적인예제
// 1. 특정 타입 제거(U)
type Exclude<T, U> = T extends U ? never : T;
type A1 = Exclude<number | string | boolean, string>;

// 2. 특정 타입만 뽑아오기 (U)
type Extract<T, U> = T extends U ? T : never; // U : never내가 예상한 답..
type B1 = Extract<number | string | boolean, string>;

// inter - 추론하기(inference)
type FuncA = () => string;
type FuncB = () => number;
type ReturnType<T> = T extends () => infer R ? R : never;
type Aa = ReturnType<FuncA>;
type Bb = ReturnType<FuncB>;
type c = ReturnType<number>;

// 예제
type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;
// 1. T는 프로미스 타입이어야 한다.
// 2. 프로미스 타입의 결과값 타입을 반환해야 한다.

type promiseA = PromiseUnpack<Promise<number>>;
type promiseB = PromiseUnpack<Promise<string>>;
