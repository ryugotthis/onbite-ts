// 객체 타입 호환

type Animal = {
  name: string;
  color: string;
};

type Dog = {
  name: string;
  color: string;
  breed: string;
};

let animal: Animal = {
  name: '기린',
  color: 'yellow',
};

let dog: Dog = {
  name: '핑구',
  color: 'black',
  breed: '푸들',
};

animal = dog;
// dog = animal 에러

type ProgrammingBook = {
  name: string;
  price: number;
  skill: string;
};

let programmingBook: ProgrammingBook = {
  name: '한 입 크기로 잘라먹는 리액트',
  price: 33000,
  skill: 'reactjs',
};

// 초과 프로퍼티 검사
type Book = {
  name: string;
  price: number;
};

let book2: Book = {
  name: '철학',
  price: 27500,
  // skill:"사색" // 에러
};
let book3: Book = programmingBook; // 이렇게는 가능

// 함수에서도 초과 프로퍼티 피하기
function func(book: Book) {} // TypeScript는 함수 내부에 return 문이 없으면 자동으로 void로 추론
// void 함수는 런타임에서 undefined를 반환하지만, 타입 상으로는 void라고 표현
func({
  name: '프랑스어',
  price: 40000,
  // skill:"delf" //여기선 에러
});
func(programmingBook); // 이렇게는 가능

// 대수타입 - 여러개의 타입을 합성해서 새롭게 만들어 낸 타입 / 합집합, 교집합
// 1. 합집합
type Person = {
  name: string;
  language: string;
};

type Pet = {
  name: string;
  color: string;
};

type Union = Person | Pet;
let union1: Union = {
  name: '이지스',
  language: 'french',
  color: 'grey',
};
let union2: Union = {
  name: '이지스',
  color: 'grey',
};
// 에러!
// let union3:Union = {
//   name:"이지스",
// }

// 2. 교집합
type Intersection = Person & Pet;
// 모든 키 값이 다 포함 되어야 함
let Intersection: Intersection = {
  name: '루까',
  language: 'french',
  color: 'white',
};
