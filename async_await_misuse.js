// Async/Await Misuse

// 1. Unnecessary async function
async function getCurrentTime() {
    return new Date().toISOString(); // Bug: No await operation, should be synchronous
}

// 2. Missing await keyword
async function fetchUserData(userId) {
    const response = fetch(`/api/users/${userId}`); // Bug: Missing await
    return response.json(); // Bug: Missing await
}

// 3. Async function that doesn't return a promise
async function processData(data) {
    const result = data.map(item => item * 2); // Bug: No async operations
    return result; // Bug: Should not be async
}

// 4. Unnecessary async in callback
function processItems(items) {
    return items.map(async (item) => { // Bug: Unnecessary async in map callback
        return item * 2;
    });
}

// 5. Missing error handling in async function
async function saveUser(user) {
    const result = await database.save(user); // Bug: No try-catch for potential errors
    return result;
}

// 6. Async function with synchronous operations only
async function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // Bug: No async operations, should be synchronous
}

// 7. Unnecessary async in event handler
async function handleClick(event) {
    const value = event.target.value; // Bug: No async operations
    console.log(value);
}

// 8. Missing await in forEach
async function processUsers(users) {
    users.forEach(async (user) => { // Bug: forEach doesn't wait for async operations
        await saveUser(user);
    });
}

// 9. Async function that throws synchronously
async function divideNumbers(a, b) {
    if (b === 0) {
        throw new Error('Division by zero'); // Bug: Synchronous throw in async function
    }
    return a / b;
}

// 10. Unnecessary async in getter
class User {
    get name() { // Bug: Getter should not be async
        return this._name;
    }
}

// 11. Missing await in Promise.all
async function fetchMultipleUsers(userIds) {
    const promises = userIds.map(id => fetch(`/api/users/${id}`));
    const responses = Promise.all(promises); // Bug: Missing await
    return responses.map(response => response.json());
}

// 12. Async function with only synchronous side effects
async function logMessage(message) {
    console.log(message); // Bug: No async operations
    return true;
}

// 13. Unnecessary async in constructor
class DataProcessor {
    constructor() { // Bug: Constructor cannot be async
        this.data = [];
    }
}

// 14. Missing await in async IIFE
(async function() {
    const data = fetch('/api/data'); // Bug: Missing await
    console.log(data);
})();

// 15. Async function that returns void
async function updateCounter() {
    counter++; // Bug: No async operations and returns void
}

// 16. Unnecessary async in filter callback
function filterUsers(users) {
    return users.filter(async (user) => { // Bug: Unnecessary async in filter
        return user.isActive;
    });
}

// 17. Missing await in reduce
async function calculateTotal(prices) {
    return prices.reduce(async (total, price) => { // Bug: reduce doesn't work well with async
        const currentTotal = await total;
        return currentTotal + price;
    }, 0);
}

// 18. Async function with synchronous validation
async function createUser(userData) {
    if (!userData.name) {
        throw new Error('Name is required'); // Bug: Synchronous validation in async function
    }
    return await saveUser(userData);
}

// 19. Unnecessary async in computed property
const computedValue = async () => { // Bug: Computed property should not be async
    return 42;
};

// 20. Missing await in async arrow function
const fetchData = async (url) => {
    const response = fetch(url); // Bug: Missing await
    return response.json(); // Bug: Missing await
}; 