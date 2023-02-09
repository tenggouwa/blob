module.exports = {
  homeInfo: async(ctx, next) => {
      ctx.response.body = '<h1>HOME page</h1>'
      // ctx.response.body = '有点意思';
      // console.log('有点意思');
  },
}
