const countUniqueValues = (arr) => {
  let i = 0;

  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }

  return i + 1;
};

console.log(countUniqueValues([1,1,1,4,4,5,666,666,666])); // -> 4;
console.log(countUniqueValues([1,2,3,4,5,5,5,5,5,6,7,8,9,10])); // -> 10