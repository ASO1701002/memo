const Router = require('koa-router');
const router = new Router();
const account = require('../app/account');
const memo = require('../app/memo');

router.get('/', async (ctx)=> {
    let session = ctx.session;
    let memoList;
    if(typeof session.userId !== 'undefined') {
        let id = await account.getId(session.userId);
        memoList = await memo.getMemoList(id);
    }
    await ctx.render('index',{userId:session.userId, memoList: memoList})
});

router.post('/', async (ctx) => {
    let session = ctx.session;
    let id = await account.getId(session.userId);
    if(await account.isLoggedIn(session.userId) === false){
        return ctx.redirect('/');
    }
    let body = ctx.request.body;
    if(typeof body.requestFlag === 'undefined'){
        return ctx.redirect('/');
    }
    switch (body.requestFlag) {
        case 'update':
            let updateIndex = Number(body.updateNum);
            let updateMemo = body.memo;
            await memo.updateMemo(updateMemo, id, updateIndex);
            break;
        case 'delete':
            let deleteIndex = Number(body.deleteNum);
            await memo.deleteMemo(id, deleteIndex);
            break;
        default:
            let insertMemo = body.memo;
            await memo.insertMemo(id, insertMemo);
            console.log(insertMemo)
            break;
    }
    return ctx.redirect('/');
})
module.exports = router;