const connection = require('./db')
const sql = require('./sql')

module.exports = {
    getMemoList: async (userId) => {
        let result =  (await connection.query(sql.getMemoList, [userId]))[0];
        let memoList = [];
        for (let row of result){
            memoList.push(row['memoData']);
        }
        return memoList;
    },
    updateMemo: async (data, userId, index) => {
        let updateMemoId = (await connection.query(sql.getMemoId, [userId, index]))[0][0]['memoId'];
        console.log(data)
        await connection.query(sql.updateMemo, [data, updateMemoId]);
    },
    deleteMemo: async (userId, index) => {
        let deleteMemoId = (await connection.query(sql.getMemoId, [userId, index]))[0][0]['memoId'];
        await connection.query(sql.deleteMemo, [deleteMemoId]);
    },
    insertMemo: async (userId, memo) => {
        await connection.query(sql.insertMemo, [userId, memo])
    }
}