// 제네릭

// 제네릭 함수
function func<T>(value: T): T {
  return value;
}

let num = func(10);
num.toFixed();

let bool = func(true);

let str = func('string');

let arr = func([1, 2, 3]);
// 제넬릭 함수를 호출하면서 타입 명시적으로 변수타입도 정의
let arr_tuple = func([1, 2, 3] as [number, number, number]);
let arr_tuple_generic = func<[number, number, number]>([1, 2, 3]);

// 타입 변수 응용하기
// 첫번째 사례 - 2가지 이상 제네릭 타입
function swap<T, U>(a: T, b: U) {
  return [b, a];
}
const [a, b] = swap('1', 2); // 다른 타입도 범용적으로 사용 가능!

// 두번째 사례 - 배열 첫 요소를 반환하는 제네릭 함수
function returnFirstValue<T>(data: [T, ...unknown[]]) {
  return data[0];
}
// 만약 data 타입이 그냥 배열이였다면, 여러 요소가 있는 배열의 인자를 넣을 경우 타입이 유니온이 되어 잘 안좁혀짐
// function returnFirstValue<T>(data:T[]){
//   return data[0]
// }
let num2 = returnFirstValue([1, 'ho']);
let str2 = returnFirstValue(['hiii', 66, 'kaka']);

// 세번째 사례 - 길이를 반환하는 함수
// length: number라는 속성을 가진 객체 타입만 허용
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}
let var1 = getLength([1, 2, 3]);
let var2 = getLength('12345');
let var3 = getLength({ length: 7 });
// let var4 = getLength(10) 에러

// map 메서드

const arr2 = [1, 2, 3];
const newArr = arr2.map((it) => it * 2); //[2,4,6]
function map<T>(arr: T[], callback: (item: T) => T) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}
map(arr, (it) => it * 2);

// 입력 매개변수와 반환 값의 타입이 다를 경우
function map2<T, U>(arr: T[], callback: (item: T) => U) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}
map2(['hi', 'lucas'], (it) => parseInt(it));

// forEach
const arr3 = [1, 2, 3];
arr3.forEach((it) => console.log(it));

function forEach<T>(arr: T[], callback: (item: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
forEach(arr3, (it) => console.log(it));

// 제네릭 인터페이스

interface KeyPair<K, V> {
  key: K;
  value: V;
}
let KeyPair: KeyPair<string, number> = {
  key: 'cute',
  value: 7,
};
let keyPair2: KeyPair<boolean, string[]> = {
  key: true,
  value: ['1'],
};

// 인덱스 시그니쳐

interface NumberMap {
  [key: string]: number;
}
let numberMap1: NumberMap = {
  key: 5,
  key2: 8,
};
interface Map<V> {
  [key: string]: V;
}
let stringMap: Map<string> = {
  key: 'happy',
  key2: 'yes',
  // key3:5
};

// 제네릭 타입 별칭
type Map2<V> = {
  [key: string]: V;
};
let numberMap: Map2<number> = {
  key: 99,
};

// 제네릭 인터페이스의 활용 예시
// -> 유저 관리 프로그램
// -> 유저 구분: 학생 유저 / 개발자 유저

interface Student {
  type: 'student';
  school: string;
}

interface Developer {
  type: 'developer';
  skill: string;
}

interface User<T> {
  name: string;
  profile: T;
}

function goToSchool(user: User<Student>) {
  // 제네릭을 사용함으로써 타입 좁히기 안해도 됨
  // if (user.profile.type !== 'student') {
  //   console.log('잘 못 오셨습니다.');
  //   return;
  // }

  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}

const developerUser: User<Developer> = {
  name: '류수빈',
  profile: {
    type: 'developer',
    skill: 'typescript',
  },
};

const studentUser: User<Student> = {
  name: '홍길동',
  profile: {
    type: 'student',
    school: '대학교',
  },
};

// 프로미스

// 제네릭 타입이 resolve 타입과 같아짐!
// 성공 결과는 제네릭 기반으로 타입기반으로 선언되어 있어서 정해줄수 있지만 실패경우는
// resolve와 reject에 커서 올리면 기본 인수나 타입 상태 확인 가능!!
const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    resolve(20); // 기본 타입은 unknown
  }, 3000);
});
promise.then((response) => {
  console.log(response * 10);
});

// 실패 경우
const promise2 = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    reject('~ 때문에 실패'); // 기본 타입 any
  }, 3000);
});
promise2.catch((err) => {
  if (typeof err === 'string') {
    console.log(err);
  }
});

// 프로미스를 반환하는 함수의 타입을 정의

interface Post {
  id: number;
  title: string;
  content: string;
}
function fetchPost(): Promise<Post> {
  return new Promise((resolve, reject) => {
    // 여기 Promise<Post>도 가능하지만 함수 선언시 정해주는게 가독성이 좋음
    setTimeout(() => {
      resolve({
        id: 1,
        title: '게시글 제목',
        content: '게시글 컨텐츠',
      });
    }, 3000);
  });
}
const postRequest = fetchPost();

postRequest.then((post) => {
  post.id;
});
