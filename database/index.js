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
        console.log(error)
        return { success: false, data: { message: error['code'], status: error['statusCode'] } }
    }
}

export {
    createStudent
}