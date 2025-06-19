// Refactoring Opportunities

// 1. Repeated code that can be extracted
function validateUserName(name) {
    if (name.length < 2) {
        return { valid: false, error: 'Name too short' };
    }
    if (name.length > 50) {
        return { valid: false, error: 'Name too long' };
    }
    return { valid: true };
}

function validateUserEmail(email) {
    if (email.length < 5) {
        return { valid: false, error: 'Email too short' };
    }
    if (email.length > 100) {
        return { valid: false, error: 'Email too long' };
    }
    return { valid: true };
}

function validateUserPhone(phone) {
    if (phone.length < 10) {
        return { valid: false, error: 'Phone too short' };
    }
    if (phone.length > 15) {
        return { valid: false, error: 'Phone too long' };
    }
    return { valid: true };
}
// Bug: Repeated validation pattern - can be extracted to generic function

// 2. Complex conditionals that can be simplified
function getDiscount(customer) {
    if (customer.type === 'vip' && customer.totalSpent > 10000 && customer.isActive && customer.hasValidEmail) {
        return 0.20;
    } else if (customer.type === 'premium' && customer.totalSpent > 5000 && customer.isActive) {
        return 0.15;
    } else if (customer.type === 'regular' && customer.totalSpent > 1000) {
        return 0.10;
    } else if (customer.isFirstTime) {
        return 0.05;
    } else {
        return 0;
    }
}
// Bug: Complex conditional logic - can be simplified with strategy pattern

// 3. Long parameter lists
function createUser(firstName, lastName, email, phone, address, city, state, zipCode, country, dateOfBirth, gender, occupation, company, website, bio, avatar, preferences, settings, metadata) {
    // Bug: Too many parameters - should use object parameter
    return {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
        country,
        dateOfBirth,
        gender,
        occupation,
        company,
        website,
        bio,
        avatar,
        preferences,
        settings,
        metadata
    };
}

// 4. Inline magic numbers
function calculateShippingCost(weight, distance) {
    const baseCost = weight * 2.5; // Bug: Magic number 2.5
    const distanceCost = distance * 0.1; // Bug: Magic number 0.1
    const handlingFee = 5.0; // Bug: Magic number 5.0
    return baseCost + distanceCost + handlingFee;
}
// Bug: Magic numbers should be constants

// 5. Nested conditionals
function processOrder(order) {
    if (order.isValid) {
        if (order.payment.isValid) {
            if (order.payment.amount > 0) {
                if (order.items.length > 0) {
                    return processValidOrder(order);
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
}
// Bug: Deep nesting - can be flattened with early returns

// 6. Duplicate code blocks
function sendWelcomeEmail(user) {
    const emailContent = `Dear ${user.name},\n\nWelcome to our platform!\n\nBest regards,\nThe Team`;
    sendEmail(user.email, 'Welcome!', emailContent);
}

function sendPasswordResetEmail(user) {
    const emailContent = `Dear ${user.name},\n\nClick here to reset your password.\n\nBest regards,\nThe Team`;
    sendEmail(user.email, 'Password Reset', emailContent);
}

function sendOrderConfirmationEmail(user) {
    const emailContent = `Dear ${user.name},\n\nYour order has been confirmed.\n\nBest regards,\nThe Team`;
    sendEmail(user.email, 'Order Confirmation', emailContent);
}
// Bug: Repeated email template structure - can be extracted

// 7. Large switch statements
function getTaxRate(state) {
    switch (state) {
        case 'CA': return 0.075;
        case 'NY': return 0.085;
        case 'TX': return 0.0625;
        case 'FL': return 0.06;
        case 'WA': return 0.065;
        case 'OR': return 0;
        case 'NV': return 0.0685;
        case 'AZ': return 0.056;
        case 'CO': return 0.029;
        case 'UT': return 0.0485;
        default: return 0.05;
    }
}
// Bug: Large switch statement - can be replaced with object/map

// 8. Inconsistent error handling
function processUserData(user) {
    try {
        validateUser(user);
        saveUser(user);
        sendWelcomeEmail(user);
        return { success: true };
    } catch (error) {
        if (error.message.includes('validation')) {
            return { error: error.message };
        } else if (error.message.includes('database')) {
            return { error: 'Database error' };
        } else if (error.message.includes('email')) {
            return { error: 'Email error' };
        }
        return { error: 'Unknown error' };
    }
}
// Bug: Inconsistent error handling patterns

// 9. Feature envy
class OrderProcessor {
    calculateTotal(order) {
        const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = subtotal * order.taxRate;
        const shipping = this.calculateShipping(order.weight, order.destination);
        const discount = this.calculateDiscount(order.customer, subtotal);
        // Bug: Method accesses many properties of other objects
        return subtotal + tax + shipping - discount;
    }
}

// 10. Primitive obsession
function calculateDistance(lat1, lon1, lat2, lon2) {
    // Bug: Using primitives instead of objects
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}
// Bug: Should use Location objects instead of separate lat/lon parameters 