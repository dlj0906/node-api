/**
 * @Description: 数据库基础配置
 * @author LongJiang Dong
 * @date 2021/5/12
 */

const mysql = {
  host: '121.42.140.111', // 主机名称，一般是本机
  port: '3306', // 数据库的端口号，如果不设置，默认是3306
  user: 'root', // 创建数据库时设置用户名
  password: 'HEsoAK*dd9Se', // 创建数据库时设置的密码
  database: 'my_test', // 创建的数据库
  connectTimeout: 5000, // 连接超时
}

module.exports = mysql
