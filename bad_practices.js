// General Bad Practices

// 1. Ignoring error returns
function saveData(data) {
    const result = database.save(data);
    // Bug: Not checking if save was successful
    return true;
}

// 2. Swallowing exceptions
function processFile(filename) {
    try {
        const content = fs.readFileSync(filename, 'utf8');
        return processContent(content);
    } catch (error) {
        // Bug: Swallowing exception - should log or rethrow
    }
}

// 3. Using deprecated APIs
function getCurrentTime() {
    return new Date().getYear(); // Bug: Deprecated method, should use getFullYear()
}

// 4. Poor naming
function fn(a, b, c) {
    // Bug: Unclear variable names
    return a + b * c;
}

// 5. Lack of input validation
function divide(a, b) {
    return a / b; // Bug: No validation for b === 0
}

// 6. Inconsistent error handling
function processUser(user) {
    if (!user.name) {
        throw new Error('Name required');
    }
    if (!user.email) {
        return { error: 'Email required' }; // Bug: Inconsistent error handling
    }
    return { success: true };
}

// 7. Dead code
function calculateTotal(items) {
    let total = 0;
    for (const item of items) {
        total += item.price;
    }
    // Bug: Dead code below
    if (total > 1000) {
        console.log('High value order');
    }
    return total;
}

// 8. Unused variables
function processOrder(order) {
    const customerId = order.customerId; // Bug: Unused variable
    const total = order.items.reduce((sum, item) => sum + item.price, 0);
    return total;
}

// 9. Missing documentation
function complexCalculation(a, b, c, d) {
    // Bug: No documentation explaining the complex logic
    return Math.sqrt(a * b + c * d) / (a + b + c + d);
}

// 10. Hard-coded values
function isProduction() {
    return process.env.NODE_ENV === 'production'; // Bug: Should use constant
}

// 11. Inconsistent formatting
function formatData(data){
    if(data.length>0){
        return data.map(item=>item.toUpperCase())
    }else{
        return []
    }
    // Bug: Inconsistent spacing and formatting
}

// 12. Missing return types
function getUser(id) {
    // Bug: No return type annotation
    return database.findUser(id);
}

// 13. Overly complex conditionals
function canAccess(user, resource, action) {
    return user.isAdmin || (user.hasPermission(resource) && user.isActive && !user.isBlocked && resource.isPublic || user.ownsResource(resource)) && action.isAllowed;
    // Bug: Complex conditional hard to read
}

// 14. Inappropriate use of global variables
let currentUser = null;

function setCurrentUser(user) {
    currentUser = user; // Bug: Global state mutation
}

function getCurrentUser() {
    return currentUser; // Bug: Global state access
}

// 15. Missing null checks
function getPropertyValue(obj, property) {
    return obj[property]; // Bug: No null check for obj
}

// 16. Inefficient boolean returns
function isValidEmail(email) {
    if (email.includes('@') && email.includes('.')) {
        return true;
    } else {
        return false;
    }
    // Bug: Should return email.includes('@') && email.includes('.')
}

// 17. Unnecessary variable assignments
function calculateArea(width, height) {
    const area = width * height; // Bug: Unnecessary variable
    return area;
}

// 18. Missing error boundaries
function renderComponent(data) {
    // Bug: No error boundary for potential rendering errors
    return React.createElement('div', null, data.map(item => item.name));
}

// 19. Inconsistent naming conventions
function getUserData(userId) {
    // Bug: camelCase function but snake_case might be used elsewhere
    return fetch_user_data(userId);
}

// 20. Overly broad exception catching
function processRequest(request) {
    try {
        return handleRequest(request);
    } catch (error) {
        // Bug: Catching all exceptions without specific handling
        console.log('Error occurred');
        return null;
    }
} 