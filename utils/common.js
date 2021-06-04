const resultData = (code, message, result = null) => {
  return {
    code,
    message,
    result,
  }
}

const page = (pageSize, pageNo) => {
  pageSize = pageSize ? pageSize : 1
  pageNo = pageNo ? pageNo : 1
}
module.exports = {
  resultData,
}
