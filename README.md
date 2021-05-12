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

## 生产环境（centos7部署）
服务器端操作
```
yum update // 系统升级命令
yum install nodejs -y  // 安装Node.js
yum install yum -y // 安装Npm
npm install pm2 -g // 安装pm2
```
本地操作
```
npm install pm2 -g // 本地安装pm2
pm2 -v // 查询版本号
git remote add origin ***
git push -u origin master
pm2 ecosystem // 生成配置模板
// 修改production
production : {
  user : "登录远程服务器的用户名",
  host : "远程服务器的IP",
  ref  : "远端名称及分支名，此处填写origin/master",
  repo : "git仓库地址，此处填写git@github.com:****.git",
  path : "远程服务器部署目录，需要填写user具备写入权限的目录，此处填写/home/www/production",
  "post-deploy" : "部署后需要执行的命令，此处填写npm install && pm2 startOrRestart ecosystem.json --env production"
},
scp ~/.ssh/id_rsa.pub root@ip:/home/.ssh/authorized_keys // 通过ssh-keygen生成RSA公钥，并拷贝到远程服务器

```
服务端
```
ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts // http://github.com加入known_hosts
```
本地操作
```
pm2 deploy ecosystem.json production setup // 第一次部署
pm2 deploy ecosystem.json production // 以后部署
netstat -antp // 远程服务器查看端口情况
// 可以http://ip:port访问。（检查下ECS的防火墙设置，确保3000端口对外开放）
```