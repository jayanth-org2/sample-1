// function to check if the parenthesis are balanced

function isBalanced(str) {
    let stack = [];
    let map = {
        '(': ')',
        '{': '}',
        '[': ']'
    }

    for(let i = 0; i < str.length; i++) {
        if(str[i] === '(' || str[i] === '{' || str[i] === '[') {
            stack.push(str[i]);
        } else {
            if(str[i] !== map[last]) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

console.log(isBalanced('()'));
console.log(isBalanced('([])'));
console.log(isBalanced('([)]'));