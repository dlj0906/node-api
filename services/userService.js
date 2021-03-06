/**
 * @Description: 用户
 * @author LongJiang Dong
 * @date 2021/5/12
 */

const jwt = require('jsonwebtoken')

const boom = require('boom')
const { body, validationResult } = require('express-validator')
const md5 = require('../utils/md5')
const { querySql, queryOne } = require('../utils/index')
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED,
} = require('../utils/constant')
const { decode } = require('../utils/user-jwt')

// 登录
function login(req, res, next) {
  const err = validationResult(req)
  console.log(err)
  // 如果验证错误，empty不为空
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ message }] = err.errors
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(message))
  } else {
    let { username, password } = req.body
    // md5加密
    password = md5(password)

    const query = `select * from sys_user where username='${username}' and password='${password}'`
    querySql(query).then((user) => {
      // console.log('用户登录===', user);
      if (!user || user.length === 0) {
        res.json({
          code: CODE_ERROR,
          message: '用户名或密码错误',
          result: null,
        })
      } else {
        // 登录成功，签发一个token并返回给前端
        const token = jwt.sign(
          // payload：签发的 token 里面要包含的一些数据。
          { username },
          // 私钥
          PRIVATE_KEY,
          // 设置过期时间
          { expiresIn: JWT_EXPIRED }
        )

        const userInfo = {
          id: user[0].id,
          username: user[0].username,
          nickname: user[0].nickname,
          avatar: user[0].avatar,
          sex: user[0].sex,
          gmt_create: user[0].gmt_create,
          gmt_modify: user[0].gmt_modify,
        }

        res.json({
          code: CODE_SUCCESS,
          message: '登录成功',
          result: {
            token,
            userInfo,
          },
        })
      }
    })
  }
}

// 注册
function register(req, res, next) {
  const err = validationResult(req)
  if (!err.isEmpty()) {
    const [{ message }] = err.errors
    next(boom.badRequest(message))
  } else {
    let { username, password } = req.body
    findUser(username).then((result) => {
      // console.log('用户注册===', result);
      if (result) {
        res.json({
          code: CODE_ERROR,
          message: '用户已存在',
          result: null,
        })
      } else {
        password = md5(password)
        const query = `insert into sys_user(username, password) values('${username}', '${password}')`
        querySql(query).then((result) => {
          // console.log('用户注册===', result);
          if (!result || result.length === 0) {
            res.json({
              code: CODE_ERROR,
              message: '注册失败',
              result: null,
            })
          } else {
            const queryUser = `select * from sys_user where username='${username}' and password='${password}'`
            querySql(queryUser).then((user) => {
              const token = jwt.sign({ username }, PRIVATE_KEY, {
                expiresIn: JWT_EXPIRED,
              })

              const userData = {
                id: user[0].id,
                username: user[0].username,
                nickname: user[0].nickname,
                avatar: user[0].avatar,
                sex: user[0].sex,
                gmt_create: user[0].gmt_create,
                gmt_modify: user[0].gmt_modify,
              }

              res.json({
                code: CODE_SUCCESS,
                message: '注册成功',
                result: {
                  token,
                  userData,
                },
              })
            })
          }
        })
      }
    })
  }
}

// 重置密码
function resetPwd(req, res, next) {
  const err = validationResult(req)
  if (!err.isEmpty()) {
    const [{ message }] = err.errors
    next(boom.badRequest(message))
  } else {
    let { username, oldPassword, newPassword } = req.body
    oldPassword = md5(oldPassword)
    validateUser(username, oldPassword).then((result) => {
      console.log('校验用户名和密码===', result)
      if (result) {
        if (newPassword) {
          newPassword = md5(newPassword)
          const query = `update sys_user set password='${newPassword}' where username='${username}'`
          querySql(query).then((user) => {
            // console.log('密码重置===', user);
            if (!user || user.length === 0) {
              res.json({
                code: CODE_ERROR,
                message: '重置密码失败',
                result: null,
              })
            } else {
              res.json({
                code: CODE_SUCCESS,
                message: '重置密码成功',
                result: null,
              })
            }
          })
        } else {
          res.json({
            code: CODE_ERROR,
            message: '新密码不能为空',
            result: null,
          })
        }
      } else {
        res.json({
          code: CODE_ERROR,
          message: '用户名或旧密码错误',
          result: null,
        })
      }
    })
  }
}

// 校验用户名和密码
function validateUser(username, oldPassword) {
  const query = `select id, username from sys_user where username='${username}' and password='${oldPassword}'`
  return queryOne(query)
}

// 通过用户名查询用户信息
function findUser(username) {
  const query = `select id, username from sys_user where username='${username}'`
  return queryOne(query)
}

// 查询所有用户
findAllUser = (req, res, next) => {
  const err = validationResult(req)
  if (!err.isEmpty()) {
    const [{ message }] = err.errors
    next(boom.badRequest(message))
  } else {
    let { pageSize, pageNo } = req.query
    pageNo = pageNo || 1
    pageSize = pageSize || 10
    const query = `SELECT * FROM sys_user limit ${pageNo - 1},${pageSize}`
    querySql(query).then((result) => {
      console.log(result)
      if (result && result.length) {
        res.json({
          code: CODE_SUCCESS,
          message: '操作成功',
          result,
        })
      }
    })
  }
}

module.exports = {
  login,
  register,
  resetPwd,
  findAllUser,
}
