// Find the nth Fibonacci number
function generateFibonacci(n) {
    if (n <= 0) return [];

    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i-1] + fib[i-2]);
    }

    return fib;
}

console.log(generateFibonacci(10)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Function to check if a number is prime
function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// Unit tests
const assert = require('assert'); // Assuming Node.js environment

assert.strictEqual(isPrime(2), true);
assert.strictEqual(isPrime(3), true);
assert.strictEqual(isPrime(4), false);
assert.strictEqual(isPrime(5), true);
assert.strictEqual(isPrime(16), false);

console.log("All tests passed!");


// Function to check if a string is a palindrome
function isPalindrome(str) {
    const cleanedStr = str.replace(/\W/g, '').toLowerCase();
    const reversedStr = cleanedStr.split('').reverse().join('');
    return cleanedStr === reversedStr;
}

console.log(isPalindrome("A man a plan a canal Panama")); // true
console.log(isPalindrome("JavaScript")); // false
