const Router = require('koa-router');
const router = new Router();
const sql = require('../app/sql');
const connection = require('../app/db')
const account = require('../app/account')

router.get('/sign_up', async (ctx) => {
    let session = ctx.session;
    if(await account.isLoggedIn(session.userId) !== false){
        return ctx.redirect('/');
    }
    let renderingData;
    if (typeof session.signup_error !== 'undefined'){
        renderingData = {data: session.signup_error};
        session.signup_error = null;
    }
    await ctx.render('signup', renderingData);
});

router.post('/sign_up', async (ctx) => {
    let session = ctx.session;
    if(await account.isLoggedIn(session.userId) !== false){
        return ctx.redirect('/');
    }
    let body = ctx.request.body;
    // 必須項目が未完了
    if(typeof body.userId === 'undefined' || typeof body.password === 'undefined'){
        session.signup_error = "全部書いて";
        return ctx.redirect('/sign_up');
    }
    let userId = body.userId;
    let password = body.password;
    if(await account.registerAccountDoubleCheck(userId)){
        await account.registerAccount(userId, password);
        session.userId = userId;
        return ctx.redirect('/');
    }else{
        session.signup_error = "同じのはダメ";
        return ctx.redirect('/sign_up');
    }


});
module.exports = router;