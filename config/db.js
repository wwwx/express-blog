const env = process.env.NODE_ENV

let MYSQL_CONFIG
let REDIS_CONFIG

if (env === 'development') {
  MYSQL_CONFIG = {
    localhost: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'myblog',
  }

  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1',
  }
}

if (env === 'production') {
  MYSQL_CONFIG = {
    localhost: '127.0.0.1',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'blog', //TODO myblog
  }

  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1',
  }
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG,
}
