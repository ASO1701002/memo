const connection = require('./db');

module.exports = {
    registerAccount: 'INSERT INTO account VALUES(0,?,?);',
    isAccountExist: 'SELECT user_id as userId FROM account WHERE user_id = ?;',
    loginCheck: 'SELECT user_id as userId FROM account WHERE user_id = ? AND password = ?;',
}