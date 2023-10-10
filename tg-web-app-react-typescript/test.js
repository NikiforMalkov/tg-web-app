var nums =
[2,-1,1]

var findClosestNumber = function(nums) {
    let closest = Math.abs(nums[0])
    for (let index in nums) {
        if (nums[index] === 0) {
            return nums[index]
        }
        if (Math.abs(closest) > Math.abs(nums[index])) {
            if (nums[index] <= 0 && closest > nums[index]) {
                console.log('nums[index]', nums[index]);
                closest = nums[index]
            } 
            if (nums[index] <= 0 && Math.abs(closest) == nums[index]) {
                closest = Math.abs(nums[index])
            }
        }
    }
    console.log(closest)
    return closest
};

findClosestNumber(nums)