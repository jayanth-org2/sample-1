// Functional Correctness Bugs

// 1. Null dereference bug
function getUserName(user) {
    return user.name; // Bug: No null check for user
}

// 2. Off-by-one error in loop
function processArray(arr) {
    for (let i = 0; i <= arr.length; i++) { // Bug: Should be < not <=
        console.log(arr[i]);
    }
}

// 3. Missing else branch
function checkNumber(num) {
    if (num > 0) {
        return "positive";
    }
    if (num < 0) {
        return "negative";
    }
    // Bug: Missing else branch for num === 0
}

// 4. Incorrect calculation
function calculateDiscount(price, discountPercent) {
    return price - (price * discountPercent); // Bug: Should be price * (discountPercent / 100)
}

// 5. Wrong condition logic
function isAdult(age) {
    return age >= 18 && age < 65; // Bug: Should be age >= 18 (no upper limit)
}

// 6. Missing return statement
function getStatus(code) {
    if (code === 200) {
        return "OK";
    }
    if (code === 404) {
        return "Not Found";
    }
    // Bug: No return for other status codes
}

// 7. State/side-effect mistake
let globalCounter = 0;
function incrementCounter() {
    globalCounter++; // Bug: Side effect without return
    return globalCounter;
}

// 8. Unhandled exception
function divideNumbers(a, b) {
    return a / b; // Bug: No check for b === 0
}

// 9. Incomplete transaction rollback
function processTransaction(amount) {
    try {
        // Deduct from account
        account.balance -= amount;
        // Transfer to recipient
        recipient.balance += amount;
        return true;
    } catch (error) {
        // Bug: Only partial rollback - account.balance not restored
        recipient.balance -= amount;
        return false;
    }
}

// 10. Requirement mismatch
function validateEmail(email) {
    return email.includes('@'); // Bug: Too permissive, should use proper regex
} 