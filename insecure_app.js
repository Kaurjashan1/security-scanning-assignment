// Insecure JavaScript - for security scanning demo purposes

// VULNERABILITY: Hardcoded credentials (CWE-798 / OWASP A02)
const DB_PASSWORD = "supersecret123";
const API_KEY = "api-key-hardcoded-12345";
const JWT_SECRET = "jwt_secret_do_not_hardcode";

// VULNERABILITY: Use of eval() - arbitrary code execution (CWE-95 / OWASP A03)
function calculateExpression(userInput) {
    return eval(userInput);
}

// VULNERABILITY: Prototype pollution (CWE-1321)
function mergeObjects(target, source) {
    for (let key in source) {
        target[key] = source[key];
    }
    return target;
}

// VULNERABILITY: XSS via innerHTML (CWE-79 / OWASP A03)
function displayMessage(userInput) {
    document.getElementById("output").innerHTML = userInput;
}

// VULNERABILITY: Open redirect via user input (CWE-601 / OWASP A01)
function redirectUser(url) {
    window.location.href = url;
}

// VULNERABILITY: Storing credentials in localStorage (CWE-312 / OWASP A02)
function saveCredentials(username, password) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
}

// VULNERABILITY: SQL query built with string concat (no parameterization)
function buildQuery(userId) {
    const query = "SELECT * FROM users WHERE id = " + userId;
    console.log("Running query: " + query);
    return query;
}

// VULNERABILITY: Sensitive data in console logs (CWE-312)
function processPayment(cardNumber, cvv, amount) {
    console.log("Processing payment: card=" + cardNumber + " cvv=" + cvv);
    return { status: "success" };
}

// VULNERABILITY: Disabling TLS certificate verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// VULNERABILITY: Math.random() used for security token (not cryptographic)
function generateSessionToken() {
    return Math.random().toString(36).substring(2);
}

// VULNERABILITY: ReDoS via catastrophic backtracking regex (CWE-1333)
function validateEmail(email) {
    const regex = /^([a-zA-Z0-9]+)*@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/;
    return regex.test(email);
}

module.exports = {
    calculateExpression,
    displayMessage,
    saveCredentials,
    generateSessionToken,
    processPayment
};
