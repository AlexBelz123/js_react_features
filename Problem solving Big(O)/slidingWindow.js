function maxSubarraySum(arr, num){
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

maxSubarraySum([2,6,9,2,1,8,5,6,3],3)

// Big O(N), returns unique set of characters
const lengthOfLongestSubstring = (s) => {
  let begin = 0,
    end = 1,
    seen = {},
    unique = "",
    len = 0;

  while (end < s.length) {
    if (s[end - 1] === s[end]) {
      begin = end;
      seen = {};
    }

    if (seen[s[end]]) {
      begin += 1;
      end = begin + 1;
      seen = {};
    }
    if (end - begin > len) {
      len = end - begin;
      unique = s.substring(begin, end + 1);
    }
    seen[s[end - 1]] = 1;
    end++;
  }

  return unique;
};

console.log(lengthOfLongestSubstring("hellothere")); // -> lother
console.log(lengthOfLongestSubstring("alexbelziut")); // -> xbelziut
console.log(lengthOfLongestSubstring("advertisement")); // -> advertis
console.log(lengthOfLongestSubstring("aayzamnvyaguar")); // ->  m n v y a g u,
