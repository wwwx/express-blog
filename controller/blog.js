const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  //   console.log(12321)
  //   console.log(author, keyword)
  let sql = `select * from bolgs where 1=1 `
  if (author) {
    sql += `and author='${author}'`
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`
  }
  sql += `order by createtime desc;`
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from bolgs where id='${id}'`
  return exec(sql).then((rows) => {
    // console.log(rows)
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()
  const sql = `
    insert into bolgs (title,content,createtime,author) 
    values ('${title}','${content}','${createtime}','${author}');
  `
  return exec(sql).then((insertData) => {
    return {
      id: insertData.insertId,
    }
  })
}

const updateBlog = (blogData = {}) => {
  // console.log(id, blogData)
  const id = blogData.id
  const title = blogData.title
  const content = blogData.content
  const sql = `update bolgs set title='${title}', content='${content}' where id='${id}'`
  return exec(sql).then((updateData) => {
    // console.log(updateData)
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

const delBLog = (id, author) => {
  const sql = `delete from bolgs where id='${id}' and author='${author}'`
  return exec(sql).then((delData) => {
    console.log('delData is ', delData)
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBLog,
}
