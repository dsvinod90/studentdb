import {db, studentTable} from '../config.js'

const createOrUpdateStudent = async (data = {}) =>{
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

const readAllStudents = async () =>{
    const params = {
        TableName: studentTable,
    }

    try{
        let { Items = [] } = await db.scan(params).promise()
        Items['size'] = Items.length
        console.log(Items)
        return { success: true, data: Items }
    } catch(error){
        console.log(error)
        return { success: false, data: { message: error['code'], status: error['statusCode'] } }
    }
}

const readStudent = async (name, number) =>{
    const params = {
        TableName: studentTable,
        Key: {
            "Name": name,
            "PrimaryPhone": number 
        }
    }

    try{
        const { Item = {} } = await db.get(params).promise()
        if (!isObjectEmpty(Item)) {
            return { success: true, data: Item }
        }
        return { success: false, data: { message: 'Student not found', status: 404 } }
    } catch(error){
        console.log(error)
        return { success: false, data: { message: error['code'], status: error['statusCode'] } }
    }
}

const deleteStudent = async (name, number) =>{
    const params = {
        TableName: studentTable,
        Key: {
            "Name": name,
            "PrimaryPhone": number 
        }
    }

    try{
        await db.delete(params).promise()
        return { success: true }
    } catch(error){
        console.log(error)
        return { success: false, data: { message: error['code'], status: error['statusCode'] } }
    }
}

const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}

export {
    createOrUpdateStudent,
    readAllStudents,
    readStudent,
    deleteStudent
}