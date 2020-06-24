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
app.use(session({
    store: new SQLite3Store('session.db', {}),
    maxAge: 1000 * 60 * 60 * 24,
    secure: false
}, app));

const indexRouter = require('./router/index');
app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());

app.listen(5000);