// Original twoSum function with bugs added for code review testing

// 1. Functional correctness bug - missing return statement
function twoSum(nums, target) {
    let obj = {};
    for(let i =0; i<nums.length;i++) { 
     if(obj[target-nums[i]] === undefined) obj[nums[i]] = i;
     else return [i,obj[target-nums[i]]]
     
    }
    // Bug: Missing return statement when no solution found
}

// 2. Performance issue - inefficient algorithm
function twoSumInefficient(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return []; // Bug: O(n²) complexity instead of O(n)
}

// 3. Security vulnerability - no input validation
function twoSumUnsafe(nums, target) {
    // Bug: No validation for nums array or target
    let obj = {};
    for(let i = 0; i < nums.length; i++) { 
        if(obj[target-nums[i]] !== undefined) {
            return [i, obj[target-nums[i]]];
        }
        obj[nums[i]] = i;
    }
    return [];
}

// 4. Code anti-pattern - magic numbers and poor naming
function twoSumBadNaming(a, b) {
    let c = {};
    for(let d = 0; d < a.length; d++) { 
        if(c[b-a[d]] !== undefined) {
            return [d, c[b-a[d]]];
        }
        c[a[d]] = d;
    }
    return [];
    // Bug: Poor variable names and magic numbers
}

// 5. General bad practice - inconsistent formatting
function twoSumInconsistent(nums,target){
    let obj={};
    for(let i=0;i<nums.length;i++){
        if(obj[target-nums[i]]!==undefined)return [i,obj[target-nums[i]]];
        obj[nums[i]]=i;
    }
    return [];
    // Bug: Inconsistent spacing and formatting
}

// 6. Async/await misuse
async function twoSumAsync(nums, target) {
    let obj = {};
    for(let i = 0; i < nums.length; i++) { 
        if(obj[target-nums[i]] !== undefined) {
            return [i, obj[target-nums[i]]];
        }
        obj[nums[i]] = i;
    }
    return [];
    // Bug: No async operations, should be synchronous
}

// 7. Critical quality issue - potential memory leak
function twoSumMemoryLeak(nums, target) {
    let obj = {};
    // Bug: Large object created but never cleaned up
    for(let i = 0; i < nums.length; i++) { 
        if(obj[target-nums[i]] !== undefined) {
            return [i, obj[target-nums[i]]];
        }
        obj[nums[i]] = i;
    }
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSumInefficient([2, 7, 11, 15], 9));
console.log(twoSumUnsafe([2, 7, 11, 15], 9));
console.log(twoSumBadNaming([2, 7, 11, 15], 9));
console.log(twoSumInconsistent([2, 7, 11, 15], 9));
console.log(twoSumAsync([2, 7, 11, 15], 9));
console.log(twoSumMemoryLeak([2, 7, 11, 15], 9));
