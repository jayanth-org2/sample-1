// Performance and Scalability Issues

// 1. Inefficient string concatenation in loop
function buildString(arr) {
    let result = "";
    for (let i = 0; i < arr.length; i++) {
        result += arr[i]; // Bug: Creates new string each iteration
    }
    return result;
}

// 2. N+1 query problem
async function getUserPosts(userIds) {
    const posts = [];
    for (const userId of userIds) {
        const userPosts = await db.query("SELECT * FROM posts WHERE user_id = ?", [userId]); // Bug: N+1 queries
        posts.push(...userPosts);
    }
    return posts;
}

// 3. Blocking operation in async code
async function processData(data) {
    const result = [];
    for (const item of data) {
        const processed = heavySynchronousOperation(item); // Bug: Blocking in async function
        result.push(processed);
    }
    return result;
}

// 4. Inefficient algorithm - O(n²) instead of O(n)
function findDuplicates(arr) {
    const duplicates = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                duplicates.push(arr[i]);
            }
        }
    }
    return duplicates; // Bug: O(n²) complexity
}

// 5. Excessive memory allocation
function createLargeArray(size) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(new Array(1000).fill(0)); // Bug: Creates unnecessary nested arrays
    }
    return arr;
}

// 6. Missing resource cleanup
function readFile(path) {
    const fs = require('fs');
    const stream = fs.createReadStream(path);
    stream.on('data', (chunk) => {
        console.log(chunk);
    });
    // Bug: Stream never closed
}

// 7. Inefficient library usage
function sortArray(arr) {
    return arr.sort((a, b) => {
        return a > b ? 1 : -1; // Bug: Should use a - b for numbers
    });
}

// 8. Event loop blocking
function processLargeData(data) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        result.push(complexCalculation(data[i])); // Bug: Blocks event loop
    }
    return result;
}

// 9. Unnecessary database calls
function getUserInfo(userId) {
    const user = db.query("SELECT * FROM users WHERE id = ?", [userId]);
    const posts = db.query("SELECT * FROM posts WHERE user_id = ?", [userId]);
    const comments = db.query("SELECT * FROM comments WHERE user_id = ?", [userId]);
    // Bug: Could be done with JOINs in single query
    return { user, posts, comments };
}

// 10. Memory leak with closures
function createCounter() {
    let count = 0;
    const data = new Array(1000000).fill(0); // Bug: Large array kept in closure
    return function() {
        count++;
        return count;
    };
} 