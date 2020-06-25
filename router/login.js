const Router = require('koa-router');
const router = new Router();
const account = require('../app/account');

router.get('/login', async (ctx) => {
    let session = ctx.session;
    if(await account.isLoggedIn(session.userId) !== false){
        return ctx.redirect('/');
    }
    let renderingData;
    if (typeof session.login_error !== 'undefined'){
        renderingData = {data: session.login_error};
        session.login_error = null;
    }
    await ctx.render('login', renderingData);
});

router.post('/login', async (ctx) => {
    let session = ctx.session;
    if(await account.isLoggedIn(session.userId) !== false){
        return ctx.redirect('/');
    }
    let body = ctx.request.body;
    if(typeof body.userId === 'undefined' || typeof body.password === 'undefined'){
        session.login_error = '全部書いて！';
        return ctx.redirect('/login');
    }
    let userId = body.userId;
    let password = body.password;
    if(await account.login(userId, password)){
        session.userId = userId;
        return ctx.redirect('/');
    }
    session.login_error = '組み合わせ違う';
    return ctx.redirect('/login');
});

module.exports = router;

