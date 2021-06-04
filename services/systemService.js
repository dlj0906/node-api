/**
 * @Description: 系统管理
 * @author LongJiang Dong
 * @date 2021/5/17
 */

const { querySql } = require('../utils/index')
const {
  CODE_ERROR,
  CODE_SUCCESS,
  NULL_MESSAGE,
  SUCCESS_MESSAGE,
} = require('../utils/constant')
const { resultData } = require('../utils/common')
const boom = require('boom')

const { validationResult } = require('express-validator')

// 查询所有用户
function getUserList(req, res, next) {
  const err = validationResult(req)
  if (!err.isEmpty()) {
    const [{ message }] = err.errors
    next(boom.badRequest(message))
  } else {
    const { pageSize, pageNo } = req.body
    const query = `SELECT * FROM sys_user limit ${pageNo - 1},${pageSize}`
    querySql(query).then((result) => {
      if (!result || result.length === 0) {
        res.json(resultData(CODE_ERROR, NULL_MESSAGE))
      } else {
        res.json(
          resultData(CODE_SUCCESS, SUCCESS_MESSAGE, {
            data: result,
            total: result.length,
            pageNo: parseInt(pageNo),
            pageSize: parseInt(pageSize),
          })
        )
      }
    })
  }
}
module.exports = {
  getUserList,
}
