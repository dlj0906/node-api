export const resultData = (code, msg, data = null) => {
  return {
    code,
    msg,
    data,
  };
};

const page = (pageSize, pageNo) => {
  pageSize = pageSize ? pageSize : 1;
  pageNo = pageNo ? pageNo : 1;
};
