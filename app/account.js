const connection = require('./db')
const sql = require('./sql')

module.exports = {
    isLoggedIn: async (userId) => {
        if(typeof userId === 'undefined'){
            return false;
        }
        let result = (await connection.query(sql.isAccountExist, [userId]))[0];
        if (result.length === 0) {
            return false;
        }
        return result[0]['userId'];
    },
    registerAccountDoubleCheck: async (userId) => {
        let result = (await connection.query(sql.isAccountExist, [userId]))[0];
        if(result.length > 0){
            return false;
        }
        return true;
    },
    registerAccount: async (userId, password) => {
        await connection.query(sql.registerAccount,[userId, password]);
    },
    login: async(userId, password) => {
        let result = (await connection.query(sql.loginCheck, [userId, password]))[0];
        if(result.length == 1){
            return true;
        }
        return false;
    },
    getId: async (userId) => {
        let result = (await connection.query(sql.getId, [userId]))[0][0]['id'];
        return result;
    },
}