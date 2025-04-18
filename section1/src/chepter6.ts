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
