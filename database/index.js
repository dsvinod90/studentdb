import {db, studentTable} from '../config.js'

const createStudent = async (data = {}) =>{
    const params = {
        TableName: studentTable,
        Item: data
    }

    try{
        await db.put(params).promise()
        return { success: true }
    } catch(error){
        return { success: false}
    }
}

export {
    createStudent
}