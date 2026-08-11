// function greet(){
//     console.log( "Good afternoon")
// }

// const double = function(number) {
//     return number * 2;
// };


// closure

// function createAccount() {
//     let balance = 10;

//     return (amount) => {
//         balance++;

//         return `#${balance++}: ${toETB(amount)}`;
//     };
// }
//  console.log(createAccount)

// function createCounter() {
//     let count = 0;

//     return function() {
//         count++;
//         return count;
//     };
// }

// const counter = createCounter();

// console.log(counter()); // 1
// console.log(counter()); // 2
// console.log(counter()); // 3

// higher oreder function addig two numbers n1,n2
function fun(n1, n2, callback) {
    return callback(n1,n2);
}

// pass
function add(n1, n2) {
    return n1 +n2;
}

console.log(fun(10, 20, add));
