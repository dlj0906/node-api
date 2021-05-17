/**
 * @Description: 系统管理路由
 * @author LongJiang Dong
 * @date 2021/5/17
 */

import express from 'express'

const router = express.Router()
import services from '../services/systemService'

router.post('/getUserList', services.getUserList)

module.exports = router
