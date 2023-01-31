const popSortFun = (arr:any) => {
  let i = arr.length;
  let j = 0
  while (i > 0) {
    for (j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const frontVal = arr[j]; // 做存储 在下方更改值会变动
        arr[j] = arr[j + 1];
        arr[j + 1] = frontVal;
      }
    }
    i--;
  }
  return arr;
}



export default popSortFun;