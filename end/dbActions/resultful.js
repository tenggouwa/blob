
const ResultFul = (
  success = false,
  msg = '',
  data = null,
  limit = false,
) => {
  console.log(11111);
  const result = {
    success,
    msg,
    data,
  }
  if (limit) {
    // const { pageIndex, pageSize, Total } = limit;
    result = {
      ...result,
      ...limit
    }
  }
  console.log(result);
  return result
}

module.exports = { ResultFul };