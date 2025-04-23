// 인터페이스

interface Person {
  name: string;
  age?: number;
  readonly isKind: boolean;
  sayBye?: () => void;
  sayHi(): void; // 오버로드는 호출시그니쳐 형태로 해야함
  sayHi(a: number): void;
}

type Example =
  | {
      title: string;
      id: number;
    }
  | string; // 타입 별칭 선언시 대수타입 생성가능하지만, 인터페이스 선언시 안됨

type Type1 = number | string | Person;

const person: Person | number = {
  // 인터페이스 인스턴스 사용시는 대수타입 가능
  name: '류수빈',
  isKind: true,
  sayHi: () => console.log('hi'),
  // 인터페이스에 오버로드 시그니처가 있어도, 객체를 만들 때는 그 중 하나만 만족해도 에러가 나지 않아요
  // ❌ 오버로드된 함수를 interface로 선언했다고 해서, 객체 리터럴 안에서 두 개의 함수를 각각 정의할 수는 없습니다.
  // 오버로드는 "여러 호출 시그니처"를 선언할 수 있게 해주지만,
  // 실제 구현은 단 하나만 있어야 합니다.

  // 이 방식이 안전!
  // sayHi: (a?: number) => {
  //   if (typeof a === 'number') {
  //     console.log("Hi with number", a);
  //   } else {
  //     console.log("Hi!");
  //   }
  // }
};

person.sayHi();
person.sayHi(1); // JavaScript는 기본적으로 함수에 인자를 더 넣어도 에러가 나지 않습니다.

// 인터페이스의 확장
interface Animal {
  name: string;
  color: string;
}

interface Cat extends Animal {
  isScratch: boolean;
}

const cat: Cat = {
  name: '이지스',
  color: 'grey',
  isScratch: false,
};

interface Chicken extends Animal {
  // name:"Chicken", // 서브타입이면 속성 재정의 가능
  isFly: boolean;
}

// 다중 확장
interface CatChicken extends Cat, Chicken {}

const catChicken: CatChicken = {
  name: 'Chicken',
  color: 'black',
  isScratch: true,
  isFly: false,
};

// 선언 합침 - 타입 보강할때 사용됨
interface Person1 {
  name: string;
}
interface Person1 {
  // name:number 중복 정의시 충돌됨! 확장이 아니니까!
  age: number;
}
const person1: Person1 = {
  name: '수빈',
  age: 26,
};
