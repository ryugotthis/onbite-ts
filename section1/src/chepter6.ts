// 함수와 타입
// 매개변수

function introduce(name = '루까') {
  console.log(`name:${name}`); // name 타입 자동 지정
}

function introduce2(name = '루까', tall?: number) {
  console.log(`name:${name}`);
  console.log(`tall:${tall}`);
  // console.log(`tall:${tall+1}`) undefined 일 수 있어서 에러
  // 타입 좁히기로 만들 수 있음
  if (typeof tall === 'number') {
    console.log(`tall:${tall + 1}`);
  }
}

function getSum(...rest: number[]) {
  //튜플로 크기,타입 고정 가능
  // ...rest:[number,number,number]
  let sum = 0;
  rest.forEach((it) => (sum += it));
  return sum;
}
getSum(1, 2, 3);
getSum(1, 2, 3, 4, 5);

// 함수 타입 표현식
// 비슷한 형식 여러개 만들 때 중복 없앰
type Operation = (a: number, b: number) => number;

const add: Operation = (a, b) => a + b;
// 일반함수에서는 타입별칭 직접 사용 안됨
function sub(a: number, b: number): number {
  return a - b;
}

// 호출 시그니처
type Operation2 = {
  (a: number, b: number): number;
};

// 함수 타입 호환성
// 특정 함수의 타입을 다른 함수 타입으로 취급해도 괜찮은가를 판단
// 1. 반환값 타입이 호환되는가
// 2. 매개변수의 타입이 호환되는가

// 1. 반환값 타입
type A = () => number;
type B = () => 10;

let a: A = () => 10;
let b: B = () => 10;

a = b;
// b=a 반환 값 다운캐스팅으로 안 됨

// 2. 매개변수가 호환되는가
// 2-1 매개변수가 같을 때
type C = (value: number) => void;
type D = (value: 10) => void;

let c: C = (value) => {};
let d: D = (value) => {};

// c=d 매개변수 업캐스팅 안 됨
d = c;
// c(num) = d(10) => c(100) = d(100) 안됨
// d(10) = c(num) => d(10) => c(10) 됨

type Animal = {
  // 슈퍼타입
  name: string;
};
type Dog = {
  // 서브타입
  name: string;
  color: string;
};

let animalFunc = (animal: Animal) => {
  console.log(animal.name);
};
let dogFunc = (dog: Dog) => {
  console.log(dog.name);
  console.log(dog.color);
};

// animalFunc = dogFunc 이렇게하면 dogFunc에서 사용 안되는 속성이 새김
dogFunc = animalFunc;

let testFunc = (animal: Animal) => {
  console.log(animal.name);
  // console.log(animal.color)
};

let testFunc2 = (dog: Dog) => {
  console.log(dog.name);
};

// 2-2 매개변수의 개수가 다를 때

type Func1 = (a: number, b: number) => void;
type Func2 = (a: number) => void;

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};

func1 = func2;
// func2 = func1

// 함수 오버로딩 - 오직 TS만 지원됨, JS는 안 됨
// 하나의 함수를 매개변수의 개수나 타입에 따라 여러가지 버전으로 만드는 문법

// 오버로딩 버전들 -> 오버로드 시그니처
function func(a: number): void;
function func(a: number, b: number, c: number): void;

// 실제 구현부 -> 구현 시그니처
function func() {}

// func() 에러
func(1);
// func(1,2) 에러
func(1, 2, 3);

// 매개변수 1개 -> a*20
// 매개변수 3개 -> 합
function funcA(a: number): void;
function funcA(a: number, b: number, c: number): void;
function funcA(a: number, b?: number, c?: number) {
  if (typeof b === 'number' && typeof c === 'number') {
    console.log(a + b + c);
  } else {
    console.log(a * 20);
  }
}

// 사용자 정의 타입 가드

type Dog2 = {
  name: string;
  isBark: boolean;
};
type Cat2 = {
  name: string;
  isScratched: boolean;
};

type Animal2 = Dog2 | Cat2;

function isDog2(animal: Animal2): animal is Dog2 {
  return (animal as Dog2).isBark !== undefined;
}
function isCat2(animal: Animal2): animal is Cat2 {
  return (animal as Cat2).isScratched !== undefined;
}

function warning(animal: Animal2) {
  if (isDog2(animal)) {
    // 강아지
    animal;
  } else if (isCat2(animal)) {
    // 고양이
    animal;
  }
}
