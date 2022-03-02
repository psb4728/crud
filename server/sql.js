module.exports = {
  productList: {
    query: `SELECT * FROM t_product`
  },
  freeboardList: {
    query: `SELECT * FROM freeboard`
  },
  freeboardDetail: {
    query: `SELECT * FROM freeboard
    WHERE freeboard.id = ?;`
  },
  freeboarWrite: {
    query: `INSERT INTO freeboard SET ?;`
  },
  freeboarUpdate: {
    query: `UPDATE freeboard 
    SET title = ?, 
    user_name = ?, 
    content = ?,
    update_date = current_timestamp() 
    WHERE id = ?`
  },
  freeboardDelete: {
    query: `DELETE FROM freeboard WHERE id = ?;`
  }
}
