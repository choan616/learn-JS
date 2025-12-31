export const lessons = {
  "기초:첫걸음": {
    title: "자바스크립트 첫걸음",
    description: "프로그래밍이 처음인 분들을 위해 자바스크립트가 무엇이고, 어떻게 컴퓨터와 대화하는지 배웁니다.",
    sections: [
      {
        title: "1. 자바스크립트란?",
        content: `자바스크립트는 웹페이지를 '움직이게' 만드는 언어입니다. 버튼을 눌렀을 때 팝업이 뜨거나, 이미지가 슬라이드되는 등의 모든 일들이 자바스크립트로 이루어집니다.`,
        code: `// '반갑습니다'라고 인사하기
console.log('반갑습니다!');`
      },
      {
        title: "2. 변수: 상자 만들기",
        content: `변수는 데이터를 담는 '상자'라고 생각하면 쉽습니다. \`let\`이라는 키워드로 상자를 만들고 이름을 붙여줍니다.`,
        code: `let box = '사과';
console.log(box); // 사과가 담긴 상자 확인`
      }
    ]
  },
  "기초:자료형": {
    title: "값의 종류 (자료형)",
    description: "컴퓨터가 다루는 데이터의 종류인 숫자, 문자, 참/거짓 등을 알아봅니다.",
    sections: [
      {
        title: "1. 숫자와 문자",
        content: `숫자는 그냥 적고, 문자는 항상 따옴표(\`'\` 혹은 \`\"\`)로 감싸야 합니다.`,
        code: `let age = 20; // 숫자
let name = '홍길동'; // 문자`
      },
      {
        title: "2. 불리언 (참과 거짓)",
        content: `스위치처럼 '예(true)' 혹은 '아니오(false)' 두 가지만 있는 값입니다.`,
        code: `let isHappy = true;
let isHungry = false;`
      }
    ]
  },
  "기초:연산/조건": {
    title: "계산과 선택",
    description: "더하고 빼는 계산법과 특정 상황에서만 실행되는 조건문을 배웁니다.",
    sections: [
      {
        title: "1. 사칙연산",
        content: `더하기(+), 빼기(-), 곱하기(*), 나누기(/)를 할 수 있습니다.`,
        code: `let total = 10 + 20; // 30`
      },
      {
        title: "2. 만약에? (if 문)",
        content: `특정 조건이 맞을 때만 코드를 실행하고 싶을 때 사용합니다.`,
        code: `let score = 90;
if (score > 80) {
  console.log('합격입니다!');
}`
      }
    ]
  },
  "ES5": {
    title: "ES5 핵심 가이드",
    description: "ES6 이전의 표준이지만 현재까지도 자바스크립트의 근간을 이루는 필수 ES5 문법을 배웁니다.",
    sections: [
      {
        title: "1. 엄격 모드 (Strict Mode)",
        content: `코드 상단에 \`'use strict';\`를 선언하여 자바스크립트가 더 엄격하게 에러를 체크하도록 만드는 모드입니다.
        
- **장점**: 흔히 저지르는 코딩 실수를 방지하고, 성능을 최적화하며, 보안을 강화합니다.
- **주요 특징**: 선언하지 않은 변수 사용 금지, 읽기 전용 속성 수정 시 에러 발생, delete 연산자 사용 제한 등을 강제합니다.`,
        code: `'use strict';
// x = 10; // ReferenceError: x is not defined (let/const 없이 사용 불가)

function test(a, a) { // 에러: 중복된 매개변수 이름을 허용하지 않음
  console.log(a);
}`
      },
      {
        title: "2. 접근자 속성 (Getter & Setter)",
        content: `객체의 특정 속성을 읽거나 쓸 때 함수처럼 로직을 실행할 수 있게 해줍니다.
        
- **get**: 속성값을 읽을 때 호출됩니다.
- **set**: 속성값을 할당할 때 호출되며, 입력값 검증(Validation)에 매우 유용합니다.`,
        code: `const user = {
  _age: 25,
  get age() { return this._age + '세'; },
  set age(value) {
    if (value < 0) console.error('나이는 음수일 수 없습니다');
    else this._age = value;
  }
};

user.age = 30;
console.log(user.age); // '30세'`
      },
      {
        title: "3. Object.defineProperty",
        content: `객체에 새로운 속성을 정의하거나 기존 속성을 수정할 때, 그 속성의 동작을 세밀하게 제어할 수 있습니다.
        
- **writable**: 값 변경 가능 여부
- **enumerable**: \`for...in\`이나 \`Object.keys()\`에서 노출 여부
- **configurable**: 속성 삭제 및 설정 변경 가능 여부`,
        code: `const person = {};
Object.defineProperty(person, 'id', {
  value: 123,
  writable: false, // 수정 불가
  enumerable: true
});

person.id = 456; // 무시됨 (엄격 모드에선 에러)`
      }
    ]
  },
  // --- Beginner/Core ---
  "ES6": {
    title: "ES6+ 문법 마스터",
    description: "현대 자바스크립트의 표준인 ES6(ECMAScript 2015) 이상의 주요 변화와 새로운 문법을 깊이 있게 배웁니다. 단순한 문법 습득을 넘어 내부 동작 원리를 이해하는 것이 목표입니다.",
    sections: [
      {
        title: "1. 변수 선언 (let & const)와 TDZ",
        content: `자바스크립트의 새로운 변수 선언 방식입니다. 가급적 \`const\`를 기본으로 사용하고, 재할당이 필요한 경우에만 \`let\`을 사용하세요.
        
- **let**: 블록 레벨 스코프를 가지며 재할당이 가능합니다.
- **const**: 블록 레벨 스코프를 가지며 재할당이 불가능(상수)합니다. 선언과 동시에 초기화가 필수입니다.
- **호이스팅과 TDZ**: \`let\`과 \`const\`도 호이스팅이 발생하지만, 선언문 이전에 참조하면 **TDZ(Temporal Dead Zone)**에 의해 ReferenceError가 발생합니다. 이는 \`var\`의 모호함을 해결해줍니다.`,
        code: `// var는 브라우저가 자동으로 undefined를 할당(호이스팅)
console.log(v); // undefined
var v = 1;

// let/const는 TDZ 덕분에 에러를 미리 발견 가능
// console.log(l); // ReferenceError!
let l = 2;`
      },
      {
        title: "2. 화살표 함수 (Arrow Function)",
        content: `화살표 기호(\`=>\`)를 사용하여 함수를 짧게 작성할 수 있습니다. 
        
- **특징**: 자신만의 \`this\`, \`arguments\`, \`super\`, \`new.target\` 바인딩을 가지지 않습니다.
- **Lexical this**: 화살표 함수의 \`this\`는 언제나 자신이 선언된 외부 스코프의 \`this\`를 그대로 물려받습니다. 콜백 함수 내에서 \`this\`가 바뀌는 문제를 해결할 때 매우 유용합니다.`,
        code: `const user = {
  name: 'JS',
  // 일반 함수는 호출 시점에 this 결정
  sayNormal() { setTimeout(function() { console.log(this.name); }, 100); },
  // 화살표 함수는 선언 시점에 외부(user)의 this를 기억
  sayArrow() { setTimeout(() => { console.log(this.name); }, 100); }
};

user.sayNormal(); // undefined (setTimeout 내부의 this는 window/global)
user.sayArrow();  // 'JS'`
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
        content: `배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 표현식입니다.
        
- **객체**: 중괄호 \`{}\`를 사용하며, 존재하지 않는 속성에 대한 기본값 설정이나 변수 이름 변경이 가능합니다.
- **배열**: 대괄호 \`[]\`를 사용하며, 순서 대로 값이 할당됩니다.`,
        code: `const config = { theme: 'dark', fontSize: 16 };
const { theme, fontSize: size, mode = 'active' } = config;

console.log(size); // 16
console.log(mode); // 'active' (기본값 작동)`
      },
      {
        title: "5. 전개 연산자 및 나머지 매개변수 (Spread & Rest)",
        content: `세 개의 점(\`...\`)을 사용하여 배열이나 객체를 펼치거나 모을 수 있습니다.
        
- **Spread**: 배열이나 객체의 요소를 개별 요소로 분리합니다. 얕은 복사(Shallow Copy) 시에도 자주 쓰입니다.
- **Rest**: 함수의 인자들을 배열로 묶거나, 구조 분해 시 남은 요소들을 모을 때 사용합니다.`,
        code: `// Spread: 배열 합치기 및 복사
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

// Rest: 함수의 가변 인자 처리
function sum(...numbers) {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}
console.log(sum(1, 2, 3, 4)); // 10`
      },
      {
        title: "6. 기본 매개변수 (Default Parameters)",
        content: `함수가 호출될 때 매개변수가 전달되지 않았거나 \`undefined\`인 경우 사용할 기본값을 지정할 수 있습니다.`,
        code: `function multiply(a, b = 1) {
  return a * b;
}
console.log(multiply(5, 2)); // 10
console.log(multiply(5));    // 5`
      }
    ]
  },
  "배열/객체": {
    title: "데이터 구조 심화 (배열 & 객체)",
    description: "현대 웹 개발에서 데이터를 다루는 가장 중요한 구조인 배열과 객체의 고급 활용법과 메모리 관리 방식을 배웁니다.",
    sections: [
      {
        title: "1. 배열 고차 함수 (map, filter, find, reduce)",
        content: `고차 함수는 함수를 인자로 받거나 반환하는 함수로, 배열 데이터를 선언적으로 처리하게 해줍니다.
        
- **map**: 각 요소를 변환하여 새로운 배열을 생성합니다. (1:1 매핑)
- **filter**: 조건(콜백이 true 반환)을 만족하는 요소만 모아 새로운 배열을 만듭니다.
- **reduce**: 배열의 요소를 순회하며 하나의 누적 결과값(합계, 새로운 객체 등)을 만들어냅니다.`,
        code: `const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false }
];

// active한 사용자만 찾아 이름만 추출
const names = users
  .filter(u => u.active)
  .map(u => u.name); // ['Alice']`
      },
      {
        title: "2. 얕은 복사 vs 깊은 복사 (Shallow vs Deep Copy)",
        content: `객체와 배열은 기본적으로 **참조(Reference)**로 복사됩니다.
        
- **얕은 복사**: 최상위 속성만 복사하고 내부 중첩 객체는 참조를 공유합니다. (\`...\`, \`Object.assign\`)
- **깊은 복사**: 모든 중첩 데이터까지 완전히 새로운 메모리에 복사합니다. (\`JSON.parse(JSON.stringify())\`, \`structuredClone\`)`,
        code: `const original = { a: 1, b: { c: 2 } };
const shallow = { ...original };
const deep = structuredClone(original);

original.b.c = 99;
console.log(shallow.b.c); // 99 (중첩 객체 참조 공유)
console.log(deep.b.c);    // 2 (완전 분리)`
      }
    ]
  },
  "비동기": {
    title: "비동기 자바스크립트와 이벤트 루프",
    description: "네트워크 요청 등 시간이 걸리는 작업을 처리하는 원리와 싱글 스레드인 자바스크립트가 효율적으로 동작하는 방식을 이해합니다.",
    sections: [
      {
        title: "1. Promise와 async/await",
        content: `비동기 작업의 성패를 나타내는 객체 \`Promise\`와 이를 더 직관적인 코드로 작성하게 해주는 \`async/await\`입니다.
        
- **Promise**: pending(대기), fulfilled(성공), rejected(실패) 상태를 가집니다. \`.then()\`과 \`.catch()\`로 처리합니다.
- **async/await**: 비동기 코드를 동기 코드처럼 한 줄씩 읽히게 작성할 수 있습니다. 에러 처리는 \`try...catch\`를 사용합니다.`,
        code: `async function fetchData() {
  try {
    const res = await fetch('https://api.example.com/data');
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('실패:', err.message);
  }
}`
      },
      {
        title: "2. 이벤트 루프와 태스크 큐",
        content: `자바스크립트 엔진은 콜 스택이 비어있을 때 태스크 큐에서 기다리는 작업들을 가져와 실행합니다.
        
- **마이크로태스크(Microtask)**: \`Promise\` 콜백 등. 일반 태스크보다 높은 우선순위를 가집니다.
- **매크로태스크(Macrotask)**: \`setTimeout\`, \`setInterval\` 등.`,
        code: `console.log('1');
setTimeout(() => console.log('2'), 0); // 매크로태스크
Promise.resolve().then(() => console.log('3')); // 마이크로태스크
console.log('4');

// 출력 순서: 1 -> 4 -> 3 -> 2`
      }
    ]
  },
  "DOM": {
    title: "DOM 조작 및 렌더링",
    description: "브라우저 화면의 요소를 선택하고 수정하는 기초를 넘어, 브라우저의 렌더링 과정(CRP)과 효율적인 DOM 조작법을 배웁니다.",
    sections: [
      {
        title: "1. 요소 선택 및 생성",
        content: `\`querySelector\`를 사용하여 요소를 찾고, \`createElement\`로 동적 노드를 생성합니다. 
        
- **팁**: 반복적인 DOM 수정은 **DocumentFragment**를 사용해 리플로우(Reflow)를 최소화하세요.`,
        code: `const fragment = document.createDocumentFragment();
[1, 2, 3].forEach(n => {
  const li = document.createElement('li');
  li.textContent = \`Item \${n}\`;
  fragment.appendChild(li);
});
document.querySelector('ul').appendChild(fragment);`
      },
      {
        title: "2. 리플로우와 리페인트 (Reflow & Repaint)",
        content: `DOM 요소의 기하학적 수치(너비, 높이, 위치)가 변경되면 브라우저는 레이아웃을 다시 계산(Reflow)하고 화면을 다시 그립니다(Repaint). 과도한 리플로우는 성능 저하의 주범입니다.`
      }
    ]
  },
  "이벤트": {
    title: "이벤트 핸들링과 위임",
    description: "사용자의 동작에 반응하는 법과 대량의 이벤트를 효율적으로 관리하는 위임 기법을 배웁니다.",
    sections: [
      {
        title: "1. 이벤트 버블링과 캡처링",
        content: `이벤트는 타겟 요소에서 부모로 전파(버블링)되거나, 최상단에서 타겟으로 내려옵니다(캡처링).
        
- **stopPropagation()**: 이벤트가 더 이상 전파되지 않도록 막습니다.
- **preventDefault()**: 브라우저의 기본 동작(링크 이동, 폼 제출 등)을 중단합니다.`,
        code: `parent.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    console.log('자식 버튼 클릭됨! (위임)');
  }
});`
      },
      {
        title: "2. 이벤트 위임 (Event Delegation)",
        content: `다수의 자식 요소에 각각 리스너를 달지 않고, 하나의 부모 요소에서 이벤트를 처리하는 방식입니다. 동적으로 추가되는 요소에도 대응 가능하며 메모리를 절약합니다.`
      }
    ]
  },
  "엔진/아키텍처": {
    level: "Intermediate",
    title: "자바스크립트 엔진과 런타임",
    description: "V8 엔진의 동작 방식, 콜 스택, 힙 메모리 등 자바스크립트가 내부적으로 작동하는 원리를 파헤칩니다.",
    sections: [
      {
        title: "1. 콜 스택과 힙 (Call Stack & Memory Heap)",
        content: `- **콜 스택**: 원시 타입 값과 함수 호출의 실행 컨텍스트가 저장되는 곳입니다. (LIFO 구조)
- **메모리 힙**: 객체, 배열, 함수와 같은 참조 타입 데이터가 저장되는 넓은 메모리 영역입니다.`,
        code: `function multiply(a, b) { return a * b; }
function square(n) { return multiply(n, n); }
square(5); // 호출 시 스택에 차곡차곡 쌓임`
      },
      {
        title: "2. 가비지 컬렉션 (Mark-and-Sweep)",
        content: `더 이상 참조되지 않는 객체(도달할 수 없는 객체)를 메모리에서 자동으로 해제하는 알고리즘입니다. 뿌리(Root) 객체에서 시작하여 연결된 객체들을 '마크'하고 마크되지 않은 것들을 제거합니다.`
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
    title: "프로토타입과 객체지향",
    description: "자바스크립트의 핵심 정체성인 프로토타입 기반 상속 체계와 클래스의 내부 동작을 깊이 있게 이해합니다.",
    sections: [
      {
        title: "1. 프로토타입 체인 (Prototype Chain)",
        content: `자바스크립트의 거의 모든 객체는 부모 역할을 하는 **프로토타입 객체**를 가집니다. 특정 속성에 접근할 때 없다면 부모를 타고 올라가며 찾는 과정을 프로토타입 체이닝이라 합니다.
        
- **__proto__**: 인스턴스가 자신의 부모(생성자의 prototype)를 가리키는 링크입니다.
- **prototype 프로퍼티**: 함수만 가지며, 인스턴스가 물려받을 속성들을 정의하는 장소입니다.`,
        code: `function Animal() {}
Animal.prototype.eat = () => console.log('Nom nom');

const dog = new Animal();
dog.eat(); // 'Nom nom' (자신에겐 없지만 부모인 Animal.prototype에서 찾아냄)`
      },
      {
        title: "2. 클래스와 생성자 (Class & Constructor)",
        content: `ES6 클래스는 결국 프로토타입을 사용하기 편하게 만든 '문법적 설탕(Syntactic Sugar)'입니다. 내부적으로는 여전히 프로토타입으로 동작합니다.`,
        code: `class Person {
  constructor(name) { this.name = name; }
  sayHi() { console.log(\`Hi, I am \${this.name}\`); }
}

const me = new Person('Aiden');
console.log(Object.getPrototypeOf(me) === Person.prototype); // true`
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
  "에러 핸들링": {
    level: "Intermediate",
    title: "견고한 코드와 에러 핸들링",
    description: "프로그램의 예외 상황을 우아하게 처리하고 디버깅 효율을 높이는 기법을 학습합니다.",
    sections: [
      {
        title: "1. try...catch...finally",
        content: `런타임 에러로부터 프로그램을 보호하는 기본 블록입니다. \`finally\`는 에러 유무와 상관없이 반드시 실행해야 하는 정리 코드를 넣을 때 최적입니다.`,
        code: `try {
  // 위험한 코드
  throw new Error('커스텀 에러 발생');
} catch (e) {
  console.error(e.name, ':', e.message);
} finally {
  console.log('작업 마무리');
}`
      },
      {
        title: "2. 사용자 정의 에러 클래스",
        content: `단순한 내장 Error 객체만 쓰지 않고, 상황별로 구체적인 에러 클래스를 만들어 가독성을 높일 수 있습니다.`,
        code: `class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}`
      }
    ]
  },
  "모듈": {
    level: "Intermediate",
    title: "자바스크립트 모듈 시스템 (ESM)",
    description: "커다란 프로그램을 작은 단위로 쪼개어 관리하고 재사용하는 현대적 개발의 필수 개념입니다.",
    sections: [
      {
        title: "1. import & export",
        content: `변수, 함수, 클래스 등을 파일 밖으로 내보내고(\`export\`) 다른 파일에서 가져오는(\`import\`) 방법입니다.
        
- **Named Export**: 한 파일에서 여러 개를 내보낼 수 있으며, 이름을 정확히 맞춰 가져와야 합니다.
- **Default Export**: 한 파일당 단 하나만 가능하며, 가져올 때 이름을 자유롭게 정할 수 있습니다.`,
        code: `// lib.js
export const pi = 3.14;
export default function cube(x) { return x * x * x; }

// app.js
import myCube, { pi } from './lib.js';`
      },
      {
        title: "2. 동적 임포트 (Dynamic Import)",
        content: `필요한 시점에 코드를 비동기적으로 로딩하여 웹 앱의 초기 로딩 속도를 최적화(Code Splitting)할 수 있습니다.`,
        code: `// 클릭 시에만 모듈 로드
button.onclick = async () => {
  const { moduleA } = await import('./heavyModule.js');
  moduleA.init();
};`
      }
    ]
  },
  "정규표현식": {
    level: "Intermediate",
    title: "문자열 마스터: 정규표현식",
    description: "복잡한 텍스트 패턴을 검색, 추출, 수정하는 강력한 도구인 정규식을 배웁니다.",
    sections: [
      {
        title: "1. 기본 문법과 플래그",
        content: `정규식은 슬래시(\`/\`)로 감싸 표현합니다.
        
- **g**: 전역 검색 (Global)
- **i**: 대소문자 구분 없음 (Ignore Case)
- **m**: 다중 행 검색 (Multiline)`,
        code: `const re = /apple/gi; // 'apple'을 대소문자 무관하게 전역 검색
const str = "Apple, apple, APPLE";
console.log(str.match(re)); // ['Apple', 'apple', 'APPLE']`
      },
      {
        title: "2. 메타 문자 활용 (검증)",
        content: `이메일, 전화번호 형식 등을 검증할 때 유용한 패턴들을 조합합니다.`,
        code: `const phone = "010-1234-5678";
const re = /^\\d{3}-\\d{3,4}-\\d{4}$/; // 숫자-숫자-숫자 패턴
console.log(re.test(phone)); // true`
      }
    ]
  },
  "자료구조(Map/Set)": {
    level: "Intermediate",
    title: "신규 자료구조 Map & Set",
    description: "단순 객체/배열보다 특정한 목적에 더 부합하고 성능이 뛰어난 고급 컬렉션을 다룹니다.",
    sections: [
      {
        title: "1. Map vs Object",
        content: `\`Map\`은 객체와 달리 **모든 타입(객체 포함)**을 키로 쓸 수 있으며, 삽입 순서를 보장합니다. 크기 확인이 간편합니다(\`.size\`).`,
        code: `const map = new Map();
const keyObj = {};
map.set(keyObj, 'Value associated with object');
console.log(map.get(keyObj));`
      },
      {
        title: "2. Set (중복 제거)",
        content: `중복된 값을 허용하지 않는 유일한 값들의 집합입니다. 배열의 중복 요소를 제거할 때 매우 유용합니다.`,
        code: `const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]`
      }
    ]
  },
  "이터레이터/제너레이터": {
    level: "Intermediate",
    title: "순회와 제너레이터",
    description: "반복을 제어하고 지연 평가를 통해 성능을 최적화하는 고급 순회 기법을 배웁니다.",
    sections: [
      {
        title: "1. 제너레이터 (Generator)",
        content: `\`function*\`로 정의하며 \`yield\` 키워드를 통해 함수의 실행을 멈췄다가 나중에 다시 시작할 수 있는 특수한 함수입니다.`,
        code: `function* numberGen() {
  yield 1;
  yield 2;
  return 3;
}
const gen = numberGen();
console.log(gen.next()); // { value: 1, done: false }`
      }
    ]
  },
  "Proxy/Reflect": {
    level: "Intermediate",
    title: "메타 프로그래밍 (Proxy)",
    description: "객체의 기본 동작(읽기, 쓰기 등)을 가로채고 재정의하여 커스텀 동작을 만드는 마법 같은 기술입니다.",
    sections: [
      {
        title: "1. Proxy Trap",
        content: `객체의 속성에 접근할 때마다 검증 로직을 넣거나 로깅을 하는 등 객체를 '감시'할 수 있습니다.`,
        code: `const user = { name: 'Aiden' };
const proxy = new Proxy(user, {
  get(target, prop) {
    console.log(\`\${prop}을 읽으려 합니다\`);
    return target[prop];
  }
});
console.log(proxy.name); // 로그 출력 후 'Aiden'`
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
  },
  "그래픽(Canvas)": {
    level: "Intermediate",
    title: "그래픽 프로그래밍: Canvas API",
    description: "HTML5 Canvas를 사용하여 2D 그래픽, 애니메이션, 게임 제작의 기초를 배웁니다.",
    sections: [
      {
        title: "1. 컨텍스트와 그리기 기초",
        content: `\`canvas\` 요소의 2D 컨텍스트를 사용하여 선, 사각형, 원 등을 그립니다.`,
        code: `const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 100);`
      }
    ]
  },
  "멀티스레딩": {
    level: "Intermediate",
    title: "Web Workers와 멀티스레딩",
    description: "싱글 스레드인 자바스크립트에서 무거운 연산을 백그라운드에서 처리하여 UI 끊김을 방지하는 기법입니다.",
    sections: [
      {
        title: "1. Web Worker 시작하기",
        content: `메인 스레드와 독립된 스레드에서 스크립트를 실행합니다. 데이터는 \`postMessage\`를 통해 주고받습니다.`,
        code: `// 메인 스레드
const worker = new Worker('worker.js');
worker.postMessage('start');
worker.onmessage = (e) => console.log('결과:', e.data);`
      }
    ]
  }
};
