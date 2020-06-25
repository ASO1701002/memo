const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx)=> {
    let session = ctx.session;
    await ctx.render('index',{userId:session.userId})
})

module.exports = router;