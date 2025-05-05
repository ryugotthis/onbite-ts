// 유틸리티 타입
// 제네릭, 맵드 타입, 조건부 타입 등의 타입 조작 기능을 이용해 실무에서 자주 사용되는 타입을 미리 만들어 놓은것

interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}
// 맵드 타입 기반의 유틸리티 타입 Partial, Required, Readonly, Pick, Omit, Record
// Partial<T>
// -> 부분적인, 일부분의
// -> 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿔주는 타입

const draft: Partial<Post> = {
  title: '임시제목',
  content: '초안...',
};
// Partial은 다음과 같다, Partial 눌러도 나옴!
// type Partial<T> = {
//   [key in keyof T]?:T[key]
// }

// Required<T>
// -> 필수의, 필수적인ㄴ
// -> 특정 객체 타입의 모든 프로퍼티를 필수 프로퍼티로 바꿔주는 타입

const withThumbnailPost: Required<Post> = {
  title: '하이',
  tags: ['hi'],
  content: '안녕',
  thumbnailURL: 'https://...',
};
//type Required<T> = {
// [key in keyof T]-?: T[key] // 선택적 옵션을 빼기(-)
// }

/**
 * Readonly<T>
 * -> 읽기전용 수정불가
 * -> 특정 객체 타입에서 모든 프로퍼티를 읽기 전용으로 만들어주는 타입
 */
const readonlyPost: Readonly<Post> = {
  title: '보호된 게시글',
  tags: [],
  content: '',
};
// type Readonly<T> = {
//   readonly [key in keyof T]:T[key];
// }

// Pick<T,K>
// -> 뽑다, 고르다
// -> 객체 타입으로부터 특정 프로퍼티만 딱 골라내는 그런 타입
// 고르는게 몇 개 안될 때

interface Post2 {
  title: string;
  tags: string;
  content: string;
  thumbnailURL?: string;
}
const legacyPost: Pick<Post, 'title' | 'content'> = {
  title: '옛날 글 제목',
  content: '옛날 내용',
};

// type Pick<T,K extends keyof T> = {
//   // K extends "title" | "tags" | "content" | "thumbnailURL"
//   [key in K] : T[key]
// }

// Omit<T,K>
// -> 생략하다, 빼다
// -> 객체 타입으로부터 특정 플로퍼티를 제거하는 타입

const noTitlePost: Omit<Post, 'title'> = {
  content: '',
  tags: [],
  thumbnailURL: '',
};

// type Omit<T,K extends keyof T> = Pick<T,Exclude<keyof T,K>>

// Record
// 객체를 만들어 주는 유틸리티
// 동일한 패턴 정의

type Thumbnail = Record<'large' | 'medium' | 'small', { url: string }>;
// 첫번째 인자: 키 두번째인자: 값

type Record<K extends keyof any, V> = {
  [key in K]: V;
};

// 조건부 타입 기반의 유틸리티 타입 - Exclude, Extract, ReturnType

// Exclude<T,U>
// -> 제외하다, 추방하다
// -> T에서 U를 제거하는 타입
type A = Exclude<string | boolean, boolean>;

// type Exclude<T,U> = T extends U ? never : T
// 1단계
// Exclude<string,boolean> |
// Exclude<boolean,boolean>

// 2단계
// string |
// never

// 최종적으로는
// string (never은 공집합이므로 없어짐)

// Extract<T, U>
// -> T에서 U를 추출하는 타입

type B = Extract<string | boolean, boolean>;
// type Extract<T,U> = T extends U? T : never

// ReturnType<T>
// -> 함수의 반환값 타입을 추출하는 타입

function funcA() {
  return 'hello';
}
function funcB() {
  return 10;
}

type ReturnA = ReturnType<typeof funcA>;
type ReturnB = ReturnType<typeof funcB>;

// type ReturnType<T extends (...args: any) => any> = T extends (
//   ...args: any
// ) => infer R
//   ? R
//   : never;
