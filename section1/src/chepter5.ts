// 타입 좁히기

import { console } from 'inspector';

function func(value: number | string) {
  // value.toUpperCase(); 오류
  // value.toFixed(); 오류

  // 타입 가드 사용 = 타입 좁히기
  if (typeof value === 'number') {
    console.log(value.toFixed); // value 타입 number
  } else if (typeof value === 'string') {
    console.log(value.toUpperCase()); // value 타입 string
  }
}

type Person = {
  name: string;
  age: number;
};

function func2(value: number | string | Date | null | Person) {
  if (typeof value === 'number') {
    console.log(value.toFixed); // value 타입 number
  } else if (typeof value === 'string') {
    console.log(value.toUpperCase()); // value 타입 string
  } else if (value instanceof Date) {
    // Date는 클래스
    // instanceof: 어떤 객체가 특정 클래스(생성자 함수)의 인스턴스인지 확인할 때 사용
    console.log(value.getTime()); // value 타입 Date
  } else if (value && 'age' in value) {
    // null 이 아니면서 age 키가 있는것은 Person 타입 밖에없음!
    console.log(`${value.name}은 ${value.age}상 입니다.`); // value 타입 Person
  }
}

// 서로소 유니온 타입
// 교집합이 없는 타입들로만 만든 유니온 타입을 말함
type Admin = {
  name: string;
  kickCount: number;
};
type Member = {
  name: string;
  point: number;
};
type Guest = {
  name: string;
  visitCount: number;
};

type User = Admin | Member | Guest;

// 가독성이 무지 떨어짐
function login(user: User) {
  if ('kickCount' in user) {
    //admin 타입
    console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴하셨습니다.`);
  } else if ('point' in user) {
    //member 타입
    console.log(`${user.name}님 현재까지 ${user.point} 모았습니다.`);
  } else {
    //guest 타입
    console.log(`${user.name}님 현재까지 ${user.visitCount}번 방문했습니다.`);
  }
}

// 대안 타입에 tag 만들기 - 태그드 유니온 타입이라고 함
type Admin2 = {
  tag: 'ADMIN';
  name: string;
  kickCount: number;
};
type Member2 = {
  tag: 'MEMBER';
  name: string;
  point: number;
};
type Guest2 = {
  tag: 'GUEST';
  name: string;
  visitCount: number;
};

type User2 = Admin2 | Member2 | Guest2;
// 나아진 가독성
function login2(user: User2) {
  if (user.tag === 'ADMIN') {
    //admin 타입
    console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴하셨습니다.`);
  } else if (user.tag === 'MEMBER') {
    //member 타입
    console.log(`${user.name}님 현재까지 ${user.point} 모았습니다.`);
  } else {
    //guest 타입
    console.log(`${user.name}님 현재까지 ${user.visitCount}번 방문했습니다.`);
  }
}
// 가독성 좋음!
function login3(user: User2) {
  switch (user.tag) {
    case 'ADMIN':
      console.log(
        `${user.name}님 현재까지 ${user.kickCount}명 강퇴하셨습니다.`
      );
      break;
    case 'MEMBER':
      console.log(`${user.name}님 현재까지 ${user.point} 모았습니다.`);
      break;
    case 'GUEST':
      console.log(`${user.name}님 현재까지 ${user.visitCount}번 방문했습니다.`);
  }
}

// 복습겸 한 가지 더 사례
// 비동기 작업의 결과를 처리하는 객체

type AsyncTask = {
  state: 'LOADING' | 'FAILED' | 'SUCCESS';
  error?: {
    message: string;
  };
  response?: {
    data: '데이터~';
  };
};

const loading: AsyncTask = {
  state: 'LOADING',
};

const failed: AsyncTask = {
  state: 'FAILED',
  error: {
    message: '오류 발생 원인은 ~~',
  },
};

const success: AsyncTask = {
  state: 'SUCCESS',
  response: {
    data: '데이터~',
  },
};

function processResult(task: AsyncTask) {
  switch (task.state) {
    case 'LOADING':
      console.log('로딩중...');
      break;
    case 'FAILED': // AsyncTask에 옵셔널이 되어있어서 좁혀질 타입이 없음!!
      console.log(`에러발생 : ${task.error?.message}`);
      break;
    case 'SUCCESS': {
      console.log(`성공 : ${task.response?.data}`);
    }
  }
}

// 좋은 코드 각각 타입을 나누어 서로소 유니온 타입 만들기
type LoadingTask = {
  state: 'LOADING';
};
type FAILEDTask = {
  state: 'FAILED';
  error: {
    message: string;
  };
};
type SUCCESSTask = {
  state: 'SUCCESS';
  response: {
    data: string;
  };
};

type AsyncTask2 = LoadingTask | FAILEDTask | SUCCESSTask;
// 타입들이 잘 좁혀짐~
function processResult2(task: AsyncTask2) {
  switch (task.state) {
    case 'LOADING':
      console.log('로딩중...');
      break;
    case 'FAILED': // 타입 좁혀짐!
      console.log(`에러발생 : ${task.error.message}`);
      break;
    case 'SUCCESS': {
      console.log(`성공 : ${task.response.data}`);
    }
  }
}
