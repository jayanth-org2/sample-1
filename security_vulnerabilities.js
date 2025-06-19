// Security Vulnerabilities

// 1. SQL Injection
function getUserById(userId) {
    const query = `SELECT * FROM users WHERE id = ${userId}`; // Bug: SQL injection
    return db.execute(query);
}

// 2. XSS vulnerability
function displayUserInput(input) {
    document.getElementById('output').innerHTML = input; // Bug: XSS - should use textContent
}

// 3. Hard-coded secrets
const config = {
    database: {
        host: 'localhost',
        user: 'admin',
        password: 'superSecret123!' // Bug: Hard-coded password
    }
};

// 4. Missing authentication check
function deleteUser(userId) {
    // Bug: No authentication check
    return db.query("DELETE FROM users WHERE id = ?", [userId]);
}

// 5. Command injection
function executeCommand(command) {
    const { exec } = require('child_process');
    exec(command); // Bug: Command injection - no validation
}

// 6. Unsafe eval usage
function processUserInput(input) {
    return eval(input); // Bug: eval on user input
}

// 7. Information leakage
function handleError(error) {
    console.log('Error details:', error.stack); // Bug: Exposes stack trace
    return { message: 'An error occurred' };
}

// 8. Missing input validation
function createUser(userData) {
    // Bug: No validation of userData
    return db.query("INSERT INTO users SET ?", userData);
}

// 9. Insecure random number generation
function generateToken() {
    return Math.random().toString(36); // Bug: Not cryptographically secure
}

// 10. Missing CSRF protection
function updateProfile(userData) {
    // Bug: No CSRF token validation
    return db.query("UPDATE users SET ? WHERE id = ?", [userData, userData.id]);
}

// 11. Directory traversal
function readFile(filename) {
    const fs = require('fs');
    return fs.readFileSync(filename, 'utf8'); // Bug: No path validation
}

// 12. Insecure cookie settings
function setCookie(name, value) {
    document.cookie = `${name}=${value}`; // Bug: No secure, httpOnly flags
}

// 13. Missing rate limiting
function login(username, password) {
    // Bug: No rate limiting on login attempts
    return authenticateUser(username, password);
}

// 14. Unsafe deserialization
function processData(data) {
    return JSON.parse(data); // Bug: No validation of JSON structure
}

// 15. Missing authorization check
function accessAdminPanel() {
    // Bug: No admin role check
    return renderAdminPanel();
} 