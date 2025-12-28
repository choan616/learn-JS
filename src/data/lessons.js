export const lessons = {
  // --- Beginner/Core ---
  "ES6": {
    title: "ES6+ 문법 마스터",
    description: "현대 자바스크립트의 표준인 ES6(ECMAScript 2015) 이상의 주요 변화와 새로운 문법을 깊이 있게 배웁니다.",
    sections: [
      {
        title: "1. 변수 선언 (let & const)",
        content: `자바스크립트의 새로운 변수 선언 방식입니다. 가급적 \`const\`를 기본으로 사용하고, 재할당이 필요한 경우에만 \`let\`을 사용하세요.
        
- **let**: 블록 레벨 스코프를 가지며 재할당이 가능합니다. 호이스팅이 발생하지만 초기화 전까지는 TDZ(Temporal Dead Zone)에 빠져 참조가 불가능합니다.
- **const**: 블록 레벨 스코프를 가지며 재할당이 불가능합니다. 선언과 동시에 초기화가 필수입니다.`,
        code: `const PI = 3.14;
let score = 10;
score = 20; // 가능

// PI = 3.15; // 에러 발생!`
      },
      {
        title: "2. 화살표 함수 (Arrow Function)",
        content: `화살표 기호(\`=>\`)를 사용하여 함수를 짧게 작성할 수 있습니다. 
        
- **특징**: 자신만의 \`this\`, \`arguments\`, \`super\`, \`new.target\` 바인딩을 가지지 않습니다.
- **this**: 화살표 함수의 \`this\`는 언제나 상위 스코프의 \`this\`를 가리킵니다(Lexical this).`,
        code: `// 일반 함수
const add = function(a, b) { return a + b; };

// 화살표 함수
const addArrow = (a, b) => a + b;`
      },
      {
        title: "3. 템플릿 리터럴 (Template Literals)",
        content: `백틱(\` \`)을 사용하여 문자열 내부에 변수나 표현식을 직접 삽입할 수 있습니다. 줄바꿈을 그대로 인식하여 여러 줄 문자열 작성도 쉽습니다.`,
        code: `const name = 'JS';
const message = \`Hello, 
\${name} World!\`; 

console.log(message);`
      },
      {
        title: "4. 구조 분해 할당 (Destructuring)",
        content: `배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 표현식입니다. 기본값 설정과 변수 이름 변경도 가능합니다.`,
        code: `// 객체 구조 분해 (이름 변경)
const user = { id: 1, name: 'Alice' };
const { id: userId, name } = user;

// 배열 구조 분해
const [first, ...others] = [10, 20, 30, 40]; // others는 [20, 30, 40]`
      }
    ]
  },
  "배열/객체": {
    title: "배열과 객체 기초",
    description: "데이터를 다루는 가장 중요한 구조인 배열과 객체의 핵심 메서드를 배웁니다.",
    sections: [
      {
        title: "1. 고차 함수 (map, filter, find)",
        content: `배열의 데이터를 가공하거나 조건에 맞는 데이터를 찾을 때 사용합니다.
        
- **map**: 각 요소를 변환하여 새로운 배열을 만듭니다.
- **filter**: 조건을 만족하는 요소만 모아 새로운 배열을 만듭니다.
- **find**: 조건을 만족하는 첫 번째 요소를 반환합니다.`,
        code: `const items = [
  { id: 1, name: 'A', price: 100 },
  { id: 2, name: 'B', price: 200 }
];

const names = items.map(i => i.name); // ['A', 'B']
const expensive = items.filter(i => i.price > 150); // [{ id: 2, name: 'B', ... }]`
      },
      {
        title: "2. reduce (누산기)",
        content: `배열의 요소를 순회하며 하나의 결과값을 만들어냅니다. 합계나 평균을 구할 때 필수적입니다.`,
        code: `const total = [1, 2, 3].reduce((acc, cur) => acc + cur, 0); // 6`
      }
    ]
  },
  "비동기": {
    title: "비동기 자바스크립트",
    description: "네트워크 요청, 파일 읽기 등 시간이 걸리는 작업을 멈춤 없이 처리하는 기술입니다.",
    sections: [
      {
        title: "1. Promise와 async/await",
        content: `비동기 결과를 처리하기 위해 사용합니다. \`await\`는 반드시 \`async\` 함수 내부에서만 사용 가능합니다.`,
        code: `async function getData() {
  const response = await fetch('url');
  const result = await response.json();
  return result;
}`
      }
    ]
  },
  "DOM": {
    title: "DOM 조작 기초",
    description: "브라우저 화면의 요소를 선택하고 수정하는 기초를 배웁니다.",
    sections: [
      {
        title: "1. 요소 선택 및 수정",
        content: `\`querySelector\`를 사용하여 요소를 찾고, \`textContent\`나 \`classList\`로 수정합니다.`,
        code: `const title = document.querySelector('#title');
title.textContent = 'Hello World';
title.classList.add('active');`
      }
    ]
  },
  "이벤트": {
    title: "이벤트 핸들링",
    description: "사용자의 클릭이나 키보드 입력에 반응하는 방법을 배웁니다.",
    sections: [
      {
        title: "1. 이벤트 리스너",
        content: `\`addEventListener\`를 사용하여 사용자의 동작을 감지합니다.`,
        code: `btn.addEventListener('click', (e) => {
  console.log('클릭됨!', e.target);
});`
      }
    ]
  },

  // --- Intermediate Curriculum ---
  "클로저/스코프": {
    level: "Intermediate",
    title: "고급 스코프와 클로저",
    description: "자바스크립트의 실행 컨텍스트, 스코프 체인, 그리고 강력한 클로저의 활용법을 배웁니다.",
    sections: [
      {
        title: "1. 실행 컨텍스트와 호이스팅",
        content: `자바스크립트 엔진이 코드를 실행하기 전후에 수행하는 환경 설정을 이해합니다. 변수와 함수의 선언문이 최상단으로 끌어올려지는 현상인 '호이스팅'의 원리를 배웁니다.`,
        code: `console.log(a); // undefined (var는 호이스팅됨)
var a = 10;

// function 선언은 전체가 호이스팅됨
sayHi(); 
function sayHi() { console.log('Hi'); }`
      },
      {
        title: "2. 클로저 (Closure)",
        content: `함수가 선언될 당시의 외부 변수를 기억하고 이를 계속 참조할 수 있는 현상입니다. 데이터 은닉(Private)과 상태 유지에 필수적인 개념입니다.`,
        code: `function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`
      },
      {
        title: "3. 'this'의 4가지 바인딩",
        content: `상황에 따라 달라지는 \`this\`의 규칙을 마스터합니다.
1. 기본 바인딩 (window/undefined)
2. 암시적 바인딩 (객체의 메서드)
3. 명시적 바인딩 (call, apply, bind)
4. new 바인딩 (생성자 함수)`,
        code: `const user = {
  name: 'Alice',
  greet() { console.log(this.name); }
};

const greet = user.greet;
greet(); // undefined (일반 함수 호출 시 this 유실)
greet.call(user); // 'Alice' (명시적 바인딩)`
      }
    ]
  },
  "프로토타입": {
    level: "Intermediate",
    title: "프로토타입과 상속",
    description: "자바스크립트의 정체성인 프로토타입 기반 상속 체계와 클래스의 내부 동작을 배웁니다.",
    sections: [
      {
        title: "1. 프로토타입 체인",
        content: `자바스크립트의 모든 객체는 부모 역할을 하는 프로토타입 객체를 가집니다. 속성을 찾을 때 위로 타고 올라가는 프로토타입 체인의 원리를 이해합니다.`,
        code: `const arr = [];
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.hasOwnProperty('length')); // 부모의 메서드 사용`
      },
      {
        title: "2. 생성자 함수와 인스턴스",
        content: `\`new\` 키워드와 함께 사용되어 객체를 생성하는 함수의 동작 방식을 배웁니다.`,
        code: `function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function() {
  console.log(this.name);
};

const p = new Person('Han');
p.sayName();`
      }
    ]
  },
  "함수형JS": {
    level: "Intermediate",
    title: "함수형 프로그래밍 입문",
    description: "순수 함수, 불변성, 고차 함수를 활용하여 읽기 쉽고 테스트 가능한 코드를 작성하는 법을 배웁니다.",
    sections: [
      {
        title: "1. 순수 함수와 불변성",
        content: `외부 상태를 변경하지 않고 동일한 입력에 대해 항상 동일한 출력을 내는 순수 함수의 중요성을 배웁니다. 원본 데이터를 수정하지 않고 새로운 데이터를 만드는 불변성 원칙을 학습합니다.`,
        code: `// 비순수 함수 (외부 상태 변경)
let total = 0;
const add = (n) => total += n;

// 순수 함수
const addPure = (a, b) => a + b;`
      },
      {
        title: "2. 커링과 합성 (Currying & Composition)",
        content: `함수를 반환하는 함수를 통해 재사용성을 높이는 커링 기호와, 여러 작은 함수를 합쳐 큰 기능을 만드는 합성을 배웁니다.`,
        code: `const multiply = a => b => a * b;
const double = multiply(2);
console.log(double(5)); // 10`
      }
    ]
  },
  "브라우저API": {
    level: "Intermediate",
    title: "실전 브라우저 API",
    description: "단순한 DOM 조작을 넘어 저장소, 위치 정보, 교차 감지 등 실무에서 유용한 API를 다룹니다.",
    sections: [
      {
        title: "1. Web Storage (Local / Session)",
        content: `브라우저에 영구적으로 정보를 저장할 수 있는 \`localStorage\`와 세션 동안만 유지되는 \`sessionStorage\`의 차이를 배웁니다.`,
        code: `localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
// JSON 처리 필수
localStorage.setItem('user', JSON.stringify({ name: 'Kim' }));`
      },
      {
        title: "2. Intersection Observer",
        content: `특정 요소가 화면(뷰포트)에 들어왔는지를 효율적으로 감지하는 API입니다. 무한 스크롤이나 이미지 지연 로딩 구현 시 필수적입니다.`,
        code: `const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) console.log('화면에 나타남!');
  });
});

observer.observe(document.querySelector('.footer'));`
      }
    ]
  },
  "성능/최적화": {
    level: "Intermediate",
    title: "성능 최적화와 메모리",
    description: "불필요한 실행과 메모리 낭비를 줄여 부드러운 웹 서비스를 만드는 고급 기법을 배웁니다.",
    sections: [
      {
        title: "1. Debounce와 Throttle",
        content: `짧은 시간에 빈번하게 발생하는 이벤트를 효율적으로 처리하는 기법입니다.
- **Debounce**: 마지막 이벤트 후 일정 시간이 지나면 실행 (검색창 입력)
- **Throttle**: 일정 주기마다 실행 (스크롤 이벤트)`,
        code: `function debounce(func, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => func(), delay);
  };
}`
      },
      {
        title: "2. 가비지 컬렉션과 메모리 누수",
        content: `자바스크립트의 자동 메모리 관리 원리를 배우고, 리스너 미해제나 순환 참조로 인한 메모리 누수를 방지하는 법을 배웁니다.`,
        code: `// 메모리 누수 위험: 해제되지 않은 리스너
window.addEventListener('resize', () => {
  // 컴포넌트 파괴 시 removeEventListener 필수!
});`
      }
    ]
  }
};
