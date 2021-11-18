import Person from './Person'
import '@styles/style.css'
import '@styles/sass.scss'

const person = new Person('Konstantin');
console.log(`${person.sayName()} says: 'Hello, World!!!'`);
