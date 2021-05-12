/**
 * @Description: 封装md5方法
 * @author LongJiang Dong
 * @date 2021/5/12
*/

const crypto = require('crypto'); // 引入crypto加密模块

function md5(s) {
  return crypto.createHash('md5').update('' + s).digest('hex');
}

module.exports = md5;