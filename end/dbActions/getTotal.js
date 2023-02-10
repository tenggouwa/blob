dbAction.getTotal = function (table_name, conditions, callback) {
  const node_model = this.getConnection(table_name);     
  if (!node_model || node_model.message) {
    if (callback) callback(1, node_model)
  } else {
    node_model.find(conditions)
      .count({})
      .exec(function (err, total) {
        if (err) {
          if (callback) callback(err);
        } else {
          if (callback) callback(null, total);
        }
      });
  }
};
/**
 * 连写查询 查询多条数据
 * @param table_name 表名
 * @param conditions 查询条件 {a:1, b:2}
 * @param options 选项：{fields: "a b c", sort: {time: -1}, limit: 10}
 * @param callback 回调方法
 */
dbAction.whereCondition = function (table_name, conditions, options, callback) {
  var node_model = this.getConnection(table_name);
  if (!node_model || node_model.message) {
      if (callback) callback(1, node_model)
  } else {
      node_model.find(conditions)
          .select(options.fields || '')
          .sort(options.sort || {})//排序 //按某个字段升序(1)降序(-1)
          .skip(options.skip || 0)//跳过的条数
          .limit(options.limit || {})//查询几条
          .exec(function (err, res) {
              if (err) {
                  if (callback) callback(err);
              } else {
                  if (callback) callback(null, res);
              }
          });
  }
};


module.exports = dbAction;