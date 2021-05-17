/**
 * @Description: 系统管理路由
 * @author LongJiang Dong
 * @date 2021/5/17
 */

const express = require('express')

const router = express.Router() // 注册路由
const services = require('../services/systemService')

router.post('/getUserList', services.getUserList)

module.exports = router
