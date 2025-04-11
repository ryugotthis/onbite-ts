// 타입 단언
// 값 as 단언 A as B
// A가 B의 슈퍼 타입이거나, B가 A의 서브타입이어야 함
// 즉 서로 겹치는게 있어야함, 서로소면 안됨!

type Person = {
  name: string;
  age: number;
};
let person = {} as Person;
person.name = '루까';
person.age = 27;

type Dog = {
  name: string;
  color: string;
};

let dog = {
  name: '이지스',
  color: 'grey',
  breed: '푸들',
} as Dog; // 속성이 하나 더 있지만 오류 안남

let dog1: Dog = {
  name: '이지스',
  color: 'grey',
  // breed:"푸들" 오류
};

let num1 = 10 as never; // 가능
let num2 = 10 as unknown; // 가능
// let num3 = 10 as string 불가능

// const 단언 - 각 키값이 리터럴이됨!
let num4 = 10 as const; // let이지만 const가 됨

let cat = {
  name: '고양이',
  color: 'yellow',
} as const; // readonly가 되어 수정 불가! readonly 하나씩 붙여주기 귀찮을때

// non null 단언
type Post = {
  title: string;
  author?: string;
};

let post: Post = {
  title: '게시글1',
  author: '루까',
};

// const len:number = post.author?.length // 옵셔널 체이닝으로 undefined이 될 수 있어서 오류
const len: number = post.author!.length; // null 또는 undefined이 되지 않는다고 단언
