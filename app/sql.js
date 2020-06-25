const connection = require('./db');

module.exports = {
    registerAccount: 'INSERT INTO account VALUES(0,?,?);',
    isAccountExist: 'SELECT user_id as userId FROM account WHERE user_id = ?;',
    loginCheck: 'SELECT user_id as userId FROM account WHERE user_id = ? AND password = ?;',
    getId: 'SELECT id FROM account WHERE user_id = ?;',

    getMemoList: 'SELECT memo_data as memoData FROM data WHERE user_id = ? ORDER BY memo_id;',
    updateMemo: 'UPDATE data SET memo_data = ? WHERE memo_id = ?;',
    deleteMemo: 'DELETE FROM data WHERE memo_id = ?;',
    insertMemo: 'INSERT INTO data VALUES (0,?,?)',
    getMemoId: 'SELECT memo_id as memoId FROM data WHERE user_id = ? ORDER BY memo_id LIMIT 1 OFFSET ?;'
}