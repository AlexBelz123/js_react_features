


// BAD Big O(N^2)
function samev1(arr1, arr2){
  if(arr1.length !== arr2.length){
      return false;
  }
  for(let i = 0; i < arr1.length; i++){
      let correctIndex = arr2.indexOf(arr1[i] ** 2) // loop inside loop <-
      if(correctIndex === -1) {
          return false;
      }
      console.log(arr2);
      arr2.splice(correctIndex,1)
  }
  return true;
}

// GOOD Big O(N)
function same(arr1, arr2){
  if(arr1.length !== arr2.length){
      return false;
  }
  let frequencyCounter1 = {}
  let frequencyCounter2 = {}
  for(let val of arr1){
      frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
  }
  for(let val of arr2){
      frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1        
  }
  console.log(frequencyCounter1);
  console.log(frequencyCounter2);
  for(let key in frequencyCounter1){  // only for objects with string keys
      if(!(key ** 2 in frequencyCounter2)){
          return false
      }
      if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]){
          return false
      }
  }
  return true
}

// Good Big O(N)
function validAnagram(str1, str2) {
  // If not a string
  if (
    typeof str1 !== "string" ||
    typeof str2 !== "string" ||
    str1.length !== str2.length
  ) {
    return false;
  }
  // If there are UpperCase characters in both strings
  const first = str1.toLowerCase();
  const second = str2.toLowerCase();
  const lookup = {};

  // Loop through first string and write into "lookup" object
  for (let ch of first) {
    // if letter exists, increment, otherwise set to 1
    lookup[ch] ? (lookup[ch] += 1) : (lookup[ch] = 1);
  }

  // Compare object with string
  for (let ch of second) {
    // can't find letter or letter is zero then it's not an anagram
    if (!lookup[ch]) {  // object value
      return false;
    } else {
      lookup[ch] -= 1;
    }
  }

  return true;
}