/**
 * @Description: 入口文件
 * @author LongJiang Dong
 * @date 2021/5/12
 */

import bodyParser from 'body-parser'
// 引入body-parser模块
import express from 'express'
// 引入express模块
import cors from 'cors'
// 引入cors模块
import routes from './routes/index' //导入自定义路由文件，创建模块化路由
const app = express()

app.use(bodyParser.json()) // 解析json数据格式
app.use(bodyParser.urlencoded({ extended: true })) // 解析form表单提交的数据application/x-www-form-urlencoded

app.use(cors()) // 注入cors模块解决跨域

app.use('/', routes)

app.listen(9000, () => {
  // 监听8088端口
  console.log('服务已启动 http://localhost:9000')
})
