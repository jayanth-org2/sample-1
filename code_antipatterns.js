// Code Anti-Patterns

// 1. God Object - class doing too many things
class UserManager {
    constructor() {
        this.users = [];
        this.config = {};
        this.database = null;
        this.logger = null;
        this.emailService = null;
        this.paymentProcessor = null;
        this.fileManager = null;
        this.cache = null;
    }
    
    addUser(user) { /* ... */ }
    removeUser(userId) { /* ... */ }
    updateUser(userId, data) { /* ... */ }
    sendEmail(to, subject, body) { /* ... */ }
    processPayment(amount, card) { /* ... */ }
    saveFile(file) { /* ... */ }
    getCache(key) { /* ... */ }
    setCache(key, value) { /* ... */ }
    validateEmail(email) { /* ... */ }
    hashPassword(password) { /* ... */ }
    generateReport() { /* ... */ }
    backupDatabase() { /* ... */ }
    // Bug: Single class handling too many responsibilities
}

// 2. Magic Numbers
function calculateTax(income) {
    if (income < 50000) {
        return income * 0.15; // Bug: Magic number 0.15
    } else if (income < 100000) {
        return income * 0.25; // Bug: Magic number 0.25
    } else {
        return income * 0.35; // Bug: Magic number 0.35
    }
}

// 3. Copy-paste code
function validateUser(user) {
    if (user.name.length < 2) {
        return { valid: false, error: 'Name too short' };
    }
    if (user.name.length > 50) {
        return { valid: false, error: 'Name too long' };
    }
    if (user.email.length < 5) {
        return { valid: false, error: 'Email too short' };
    }
    if (user.email.length > 100) {
        return { valid: false, error: 'Email too long' };
    }
    // Bug: Repeated validation pattern
}

// 4. Deep nesting
function processOrder(order) {
    if (order.isValid) {
        if (order.payment.isValid) {
            if (order.payment.amount > 0) {
                if (order.items.length > 0) {
                    if (order.shipping.isValid) {
                        if (order.shipping.address.isValid) {
                            return processValidOrder(order);
                        } else {
                            return { error: 'Invalid shipping address' };
                        }
                    } else {
                        return { error: 'Invalid shipping' };
                    }
                } else {
                    return { error: 'No items in order' };
                }
            } else {
                return { error: 'Invalid payment amount' };
            }
        } else {
            return { error: 'Invalid payment' };
        }
    } else {
        return { error: 'Invalid order' };
    }
    // Bug: Deep nesting makes code hard to read
}

// 5. Long method
function processUserRegistration(userData, paymentInfo, preferences, settings, metadata) {
    // Validate user data
    if (!userData.name || userData.name.length < 2) {
        throw new Error('Invalid name');
    }
    if (!userData.email || !userData.email.includes('@')) {
        throw new Error('Invalid email');
    }
    if (!userData.password || userData.password.length < 8) {
        throw new Error('Password too short');
    }
    
    // Validate payment info
    if (!paymentInfo.cardNumber || paymentInfo.cardNumber.length !== 16) {
        throw new Error('Invalid card number');
    }
    if (!paymentInfo.expiryDate || !paymentInfo.cvv) {
        throw new Error('Invalid payment details');
    }
    
    // Process payment
    const paymentResult = processPayment(paymentInfo);
    if (!paymentResult.success) {
        throw new Error('Payment failed');
    }
    
    // Create user account
    const hashedPassword = hashPassword(userData.password);
    const user = {
        id: generateId(),
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        createdAt: new Date()
    };
    
    // Save to database
    const savedUser = saveUserToDatabase(user);
    if (!savedUser) {
        throw new Error('Failed to save user');
    }
    
    // Set user preferences
    if (preferences) {
        saveUserPreferences(savedUser.id, preferences);
    }
    
    // Configure user settings
    if (settings) {
        saveUserSettings(savedUser.id, settings);
    }
    
    // Log registration
    logUserRegistration(savedUser.id, metadata);
    
    // Send welcome email
    sendWelcomeEmail(savedUser.email, savedUser.name);
    
    // Update analytics
    updateRegistrationAnalytics(savedUser.id);
    
    return savedUser;
    // Bug: Method is too long and does too many things
}

// 6. Excessive global state
let globalUser = null;
let globalConfig = null;
let globalDatabase = null;
let globalCache = null;
let globalLogger = null;
let globalEmailService = null;
let globalPaymentProcessor = null;
// Bug: Too much global state

// 7. Primitive obsession
function calculateShippingCost(weight, length, width, height, origin, destination) {
    // Bug: Using primitives instead of objects
    const baseCost = weight * 2.5;
    const volumeCost = length * width * height * 0.1;
    const distanceCost = calculateDistance(origin, destination) * 0.5;
    return baseCost + volumeCost + distanceCost;
}

// 8. Feature envy
class OrderProcessor {
    processOrder(order) {
        const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = total * order.taxRate;
        const shipping = this.calculateShipping(order.weight, order.destination);
        const discount = this.calculateDiscount(order.customer, total);
        // Bug: Method knows too much about other objects
        return total + tax + shipping - discount;
    }
}

// 9. Data clumps
function createUser(firstName, lastName, email, phone, address, city, state, zipCode) {
    // Bug: Related data should be grouped into objects
    return {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zipCode
    };
}

// 10. Switch statements
function getDiscount(customerType) {
    switch (customerType) {
        case 'regular':
            return 0.05;
        case 'premium':
            return 0.10;
        case 'vip':
            return 0.15;
        case 'enterprise':
            return 0.20;
        default:
            return 0;
    }
    // Bug: Switch statement could be replaced with object/map
} 