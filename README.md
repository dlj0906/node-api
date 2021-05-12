# 前言


# 目录结构
```
│  app.js                              // 入口文件
│  ecosystem.json                // pm2默认配置文件
│  package.json                       // npm包管理所需模块及配置信息
├─db
│      dbConfig.js                    // mysql基础配置
├─routes
│      index.js                       // 初始化路由信息，自定义全局异常处理
│      users.js                       // 用户路由
├─services
│      userService.js                 // 用户接口
└─utils
        constant.js                   // 自定义常量
        index.js                      // 封装连接mysql
        md5.js                        // 封装md5
        user-jwt.js                   // jwt-token验证和解析函数
```


# 技术栈
 * NodeJS v10
 * express
 * mysql v5.7
 * jwt
 * nodemon
 * cors
 * boom
 * pm2
 
# 功能模块
* 登录
* 注册

# 下载安装依赖
```
git clone https://github.com/dlj0906/node-api
cd api-admin
npm install 或 yarn
```


## 开发模式
```
npm start
```
运行之后，访问地址：http://localhost:8088

## 生产环境（后台启动服务）
```
pm2 start ecosystem.json
```

