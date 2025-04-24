function twoSum(nums, target) {
    let obj = {};
    for(let i =0; i<nums.length;i++) { 
     if(obj[target-nums[i]] === undefined) obj[nums[i]] = i;
     else return [i,obj[target-nums[i]]]
     
    }
}

console.log(twoSum([2, 7, 11, 15], 9));
