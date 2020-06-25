const connection = require('./db');

module.exports = {
    registerAccount: async (userId, password) => {
        let sql = 'INSERT INTO account VALUES(0,?,?)';
        let result = (await connection.query(sql, [userId, password]))[0];
    },
    registerAccountDoubleCheck: async (userId) => {
        let sql = 'SELECT user_id as userId FROM account WHERE user_id = ?;';
        let result = (await connection.query(sql, [userId]))[0];
        if(result.length > 0){
            return false;
        }
        return true;
    }
}