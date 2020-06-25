const path = require('path');
const Koa = require('koa');
const server = require('koa-static');
const koaBody = require('koa-body');
const render = require('koa-ejs');
const session = require('koa-generic-session');
const SQLite3Store = require('koa-sqlite3-session');

const app = new Koa();
render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'base',
    viewExt: 'ejs',
    cache: false,
    debug: false
});
app.use(server('./public'));
app.use(koaBody());
app.keys = ['newest secret key', 'older secret key'];
app.use(session({
    store: new SQLite3Store('session.db', {}),
    maxAge: 1000 * 60 * 60 * 24,
    secure: false
}, app));

const indexRouter = require('./router/index');
app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());

const signUpRouter = require('./router/signup');
app.use(signUpRouter.routes());
app.use(signUpRouter.allowedMethods());

const logoutRouter = require('./router/logout');
app.use(logoutRouter.routes());
app.use(logoutRouter.allowedMethods());

app.listen(5000);