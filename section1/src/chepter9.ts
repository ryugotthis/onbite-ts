// 타입 조작하기
// 제네릭, 인덱스드 엑세스 타입, keyof 연산자, Mapped(맵드) 타입, 템플릿 리터럴 타입, 조건부 타입

// 인덱스드 엑세스 타입
// 객체, 배열, 튜플 타입에서 특정 프로퍼티 혹은 요소의 타입으 추출하는 타입
// 객체
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number;
  };
}
function printAuthorInfo(author: Post['author']) {
  console.log(`${author.name}-${author.id}`);
}
const post: Post = {
  title: '제목',
  content: '내용',
  author: {
    id: 3,
    name: '수빈',
    age: 26,
  },
};

// 배열 - 타입 별칭 사용! interface는 객체
type PostList = {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number;
  };
}[];
function printAuthorInfoList(author: PostList[0]['author']) {
  console.log(`${author.name}-${author.id}`);
}
const postList: PostList[number] = {
  title: '제목',
  content: '내용',
  author: {
    id: 3,
    name: '수빈',
    age: 26,
  },
};

// 튜플
type Tup = [number, string, boolean];
type Tup0 = Tup[0];
type Tup1 = Tup[1];
type Tup2 = Tup[2];

type TupNum = Tup[number]; // 유니온 타입이 됨! number로 가능한 모든 타입이니까

// keyof  연산자
// 특정 객체 타입을로부터 프로퍼티 키들을 모두 스트링 리터렁 유니온 타입으로 추출하는 연산자
interface Person {
  name: string;
  age: number;
}
function getPropertyKey(person: Person, key: keyof Person) {
  return person[key];
}
const person1: Person = {
  name: '루까',
  age: 27,
};
getPropertyKey(person1, 'name'); // 루까

type Person2 = typeof person1; // 이렇게도 타입 선언 가능!

// 맵드 타입
// 기존의 객체타입으로부터 새로운 객체 타입을 만드는 타입
// type(타입별칭)에서만 사용가능, interface 안 됨
interface User {
  id: number;
  name: string;
  age: number;
}
type PartialUser = {
  // 선택적 옵션을 가지는 속성들
  [key in keyof User]?: User[key];
};
// 한 명의 유저 정보를 불러오는 기능
function fetchUser(user: User) {
  //...
}
// 한 명의 유저 정보를 수정하는 기능
function updateUser(user: PartialUser) {
  //...
}
const user1: PartialUser = {
  name: '루까',
};
// 불리언타입의 읽기 전용
type readOnlyBooleanUser = {
  readonly [key in keyof User]?: boolean;
};
const user3: readOnlyBooleanUser = {
  name: true,
};

// 템플릿 리터럴 타입
// 스트링 리터럴 타입을 기반으로 정해진 패턴의 문자열만 포함하는 타입
type Color = 'red' | 'black' | 'green';
type Animal = 'dog' | 'cat' | 'chicken';
type ColoredAnimal = `${Color}=${Animal}`;
