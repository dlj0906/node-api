/**
 * @Description: 用户路由
 * @author LongJiang Dong
 * @date 2021/5/12
 */
import express from 'express'

import { body } from 'express-validator'

import service from '../services/userService'

const router = express.Router()
// 登录/注册校验
const validator = [
  body('username').isString().withMessage('用户名类型错误'),
  body('password').isString().withMessage('密码类型错误'),
]

// 重置密码校验
const resetPwdValidator = [
  body('username').isString().withMessage('用户名类型错误'),
  body('oldPassword').isString().withMessage('密码类型错误'),
  body('newPassword').isString().withMessage('密码类型错误'),
]

// 用户登录路由
router.post('/login', validator, service.login)
// 用户注册路由
router.post('/register', validator, service.register)

// 密码重置路由
router.post('/resetPwd', resetPwdValidator, service.resetPwd)

module.exports = router
