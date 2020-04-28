const { exec, escape } = require('../db/mysql')
const { getPassword } = require('../utils/crypto')

const login = (username, password) => {
  //   console.log(username, password)
  username = escape(username)

  password = getPassword(password)
  password = escape(password)

  //   console.log('password is: ', password)

  const sql = `select username, realname from users where username=${username} and password=${password}`
  return exec(sql).then((rows) => {
    // console.log(rows)
    return rows[0] || {}
  })
}

module.exports = {
  login,
}
