const resultData = (code, msg, result = null) => {
  return {
    code,
    msg,
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
