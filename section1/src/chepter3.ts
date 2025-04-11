// 타입 추론
// 변수 초기값 기준으로 타입 추론
let a = 10;
let b = 'hello';
let c = {
  id: 1,
  name: '루까',
  profile: {
    nickname: '',
  },
  url: [''],
};

let { id, name, profile } = c;
let [one, two, three] = [1, 'hello', true];

function func() {
  return 'hello';
}

// 암묵적 any, 초기값이 없을 경우 any 진화
let d;
d = 10;

d = 'hello';

const num = 10;
const str = 'hello';
let arr = [1, 'string'];
