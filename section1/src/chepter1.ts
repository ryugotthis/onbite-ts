// 기본 타입

// number
let num1: number = 123;
let num2: number = -123; // 음수
let num3: number = 0.123; // 소수
let num4: number = -0.123;
let num5: number = Infinity; // 무한대
let num6: number = -Infinity;
let num7: number = NaN; // 숫자가 아님

// boolean
let bool1: boolean = true;
let bool2: boolean = false;

// string
let str1: string = 'hello';
let str2: string = 'hello';
let str3: string = `hello`;
let str4: string = `hello ${num1}`;

// null
let null1: null = null;

// undefined
let unde1: undefined = undefined;

// 리터럴타입
// 리터럴 -> 값
let numA: 10 = 10;
let strA: 'hello' = 'hello';

// 배열과 튜플
// 배열
let numArr: number[] = [1, 2, 3];
let strArr: string[] = ['hi', 'im', 'subin'];
let boolArr: Array<boolean> = [true, false, true];

// 배열에 들어가는 요소들의 타입이 다양할 경우
let multiArr: (number | string)[] = ['hello', 4, 'cute'];

// 다차원 배열의 타입을 정의하는 방법
let doubleArr: number[][] = [
  [1, 2, 3],
  [4, 5],
];

// 튜플 - 길이와 타입이 고정된 배열
let tupl: [number, number] = [1, 7];
// 순서 중요할때 유용
const users: [string, number][] = [
  ['루까', 1],
  ['수빈', 2],
];

// 객체
let user: {
  id: number;
  name: string;
} = {
  id: 1,
  name: '수빈',
};

let dog: {
  name: string;
  color: string;
} = {
  name: 'ping',
  color: 'brown',
};

// readonly 수정되지 않게함
let config: {
  readonly apiKey: string;
} = { apiKey: 'MY API KEY' };

// 타입 별칭

type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
};

let user1: User = {
  id: 1,
  name: 'subin',
  nickname: 'dodo',
  birth: '12/11',
  bio: 'hi',
  location: 'busan',
};
let user2: User = {
  id: 2,
  name: 'lucas',
  nickname: 'didi',
  birth: '4/19',
  bio: 'hello',
  location: 'busan',
};

// 인덱스 시그니쳐 - 키와 값 => 명시적으로 특정 타입을 선언한 것이 아니라서
// 1개든 100개든, 몇 개든 넣어도 타입은 만족
type CountryCodes = {
  [key: string]: string;
};
let example1: CountryCodes = {
  korea: 'ko',
  france: 'fr',
};

// enum 타입
// 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입
// TS만 있는 타입이고 컴파일시 사라지지 않고 JS의 객체로 변환됨
enum Role {
  ADMIN = 0,
  USER = 1,
  GUEST = 2,
}
const user11 = {
  name: '수빈',
  role: Role.ADMIN,
};
const user22 = {
  name: 'lucas',
  role: Role.USER,
};
const user33 = {
  name: 'Isis',
  role: Role.GUEST,
};
// enum 대신 객체로 정의
const Role2 = {
  ADMIN: 0,
  USER: 1,
  GUEST: 2,
} as const;

// any - 특정 변수의 타입으 우리가 확실히 모를 때
let anyVar: any = 10;
anyVar = 'Hello';
anyVar = true;
anyVar = {};
anyVar = () => {};

let num: number = 10;
num = anyVar; //  런타임에서 에러 발생!!

// unKnown - 값을 모를 땐 any보다 unknown 사용하는게 안전!
let unKnownVar: unknown;
unKnownVar = '';
unKnownVar = 1;
unKnownVar = () => {};

// num = unKnownVar 에러! unKnown은 다른 변수에 할당 안됨!
if (typeof unKnownVar === 'number') num = unKnownVar; // 타입 정제시 가능

// void - 아무것도 없음을 의미하는 타입
function fun1(): string {
  return 'hello';
}

//이 함수는 결과가 중요하지 않다
//이 함수는 실행되긴 하지만,리턴할 값과는 관계가 없다.
function fun2(): void {
  console.log('hello');
}
// 정의되지 않음
// 이 함수는 undefined를 명시적으로 반환한다
// 리턴할 값이 있을수도있는데 없을때는 undefined로! null 보다 undefined가 흔히 쓰임
function fun3(): undefined {
  console.log('hello');
  return; // return 만 쓰고 뒤에 생략 가능
}
// function findUserById(id: number): User | undefined {
//   const user = db.find(u => u.id === id);
//   return user; // 없으면 undefined 반환
// }

// 비어있음/의도적으로 없음, 직접 할당
function fun4(): null {
  console.log('hello');
  return null; // return 뒤에 null을 꼭 써줘야 함
}

// 값을 무시한다, undefined만 void에 담을 수 있음
let a: void;
a = undefined;
// a=null null 할당 안됨

// never - 불가능한 타입, 어떤 변수도 못 담음
// 값이 있을 수 없다
// 함수에서도 반환 값이 존재 할 수 없음
function fun5(): never {
  while (true) {}
}
function fun6(): never {
  throw new Error();
}
// 이 함수는 throw를 통해 예외를 던지고 종료되므로 절대 반환값이 생기지 않음
function throwError(message: string): never {
  throw new Error(message);
}
