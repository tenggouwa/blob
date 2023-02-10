const menuSchema = require('../models/menu');
const { ResultFul } = require('../dbActions/resultful');
module.exports = {
  addMenu: async(ctx, next) => {
    const { name } = ctx.request.body;
    if (!name) {
      ctx.body = ResultFul(false, '请输入名称')
      return;
    }
    const hadOne = await menuSchema.findOne({ name });
    if (hadOne) {
      ctx.body = ResultFul(false, '已有同名文章')
    } else {
      await menuSchema
        .create({ name })
        .then((res) => ctx.body = ResultFul(true, '添加成功！'))
        .catch((err) => ctx.body = ResultFul(false, '添加失败！'))
    }
  },
  fetchMenu: async(ctx) => {
    const res = await menuSchema.find();
    if (!res) {
      ctx.body = ResultFul(false, '数据获取失败');
      return;
    }
    ctx.body = {
      success: true,
      data: res,
      msg: null
    }
  }
}
