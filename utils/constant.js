/**
 * @Description: 自定义常量
 * @author LongJiang Dong
 * @date 2021/5/12
 */

module.exports = {
  CODE_ERROR: -1, // 请求响应失败code码
  CODE_SUCCESS: 200, // 请求响应成功code码
  CODE_TOKEN_EXPIRED: 401, // 授权失败
  NULL_MESSAGE: '暂无数据',
  SUCCESS_MESSAGE: '查询数据成功',
  PRIVATE_KEY: 'donglongjiang', // 自定义jwt加密的私钥
  JWT_EXPIRED: 60 * 60 * 24, // 过期时间24小时
}
