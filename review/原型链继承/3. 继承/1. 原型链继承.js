function Parent() {
    this.name = 'ParentName';
    this.actions = ['sing', 'jump', 'rap'];
}

function Child() {}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

const c1 = new Child();
c1.actions.push('basketball');
c1.name = '12'
console.log(c1.name); // 12
console.log(c1.actions); //[ 'sing', 'jump', 'rap', 'basketball' ]
const c2 = new Child();
console.log(c2.name); // ParentName
console.log(c2.actions); // [ 'sing', 'jump', 'rap', 'basketball' ]

