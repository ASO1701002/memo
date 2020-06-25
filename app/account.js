const connection = require('./db')
module.exports = {
    isLoggedIn: async (userId) => {
        if(typeof userId === 'undefined'){
            return false;
        }
        let sql = 'SELECT user_id as userId FROM account WHERE user_id = ?';
        let result = (await connection.query(sql, [userId]))[0];
        if (result.length === 0) {
            return false;
        }
        return result[0]['userId'];
    }
}