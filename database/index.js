import { db, studentTable } from '../config.js'

// Create student based on the input data
const createOrUpdateStudent = async (data = {}) => {
    const params = {
        TableName: studentTable,
        Item: data
    }

    try {
        await db.put(params).promise()
        return { success: true }
    } catch (error) {
        console.log(error)
        return { success: false, data: { message: error['code'], status: error['statusCode'] } }
    }
}

// Update an existing student
const updateStudent = async (data = {}) => {
    let updateParams = 'SET';
    let expressionAttributeValues = {};
    for (let key in data) {
        if (key === "Name" || key === "PrimaryPhone") {
            continue;
        } else {
            updateParams += ` ${key} = :${key},`;
            expressionAttributeValues[`:${key}`] = data[key];
        }
    }
    const params = {
        TableName: studentTable,
        Key: {
            "Name": data['Name'],
            "PrimaryPhone": data['PrimaryPhone'],
        },
        UpdateExpression: updateParams.slice(0, -1),
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW"
    }
    try {
        await db.update(params).promise()
        return { success: true }
    } catch (error) {
        console.log(error)
        return { success: false, data: { message: error['code'], status: error['statusCode'] } }
    }
}


const enrollStudent = async (data = {}) => {
    console.log(data['Name'])
    console.log(data['PrimaryPhone'])
    const readParams = {
        TableName: studentTable,
        Key: {
            "Name": data['Name'],
            "PrimaryPhone": data['PrimaryPhone']
        }
    }

    console.log("readParams,  , ", readParams);
    const { Item = {} } = await db.get(readParams).promise();
    console.log("Student Item in Enroll , ", Item);

    let updateExpressions = [];
    let expressionAttributeValues = {};

    for (let key in data) {
        if (key === "Name" || key === "PrimaryPhone") {
            continue;
        } else if (key === "Courses") {
            // Append new courses to the existing list
            updateExpressions.push(`${key} = list_append(${key}, :${key})`);
            expressionAttributeValues[`:${key}`] = data[key]; // assuming data[key] is an array of new courses
        } else {
            // For other attributes, set their new values
            updateExpressions.push(`${key} = :${key}`);
            expressionAttributeValues[`:${key}`] = data[key];
        }
    }

    // Check if there are updates to be made
    if (updateExpressions.length === 0) {
        // Handle case where no update is necessary
        return { success: false, data: { message: 'No update parameters provided', status: 400 } };
    }

    const updateExpression = 'SET ' + updateExpressions.join(', ');

    const params = {
        TableName: studentTable,
        Key: {
            "Name": data['Name'],
            "PrimaryPhone": data['PrimaryPhone']
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW"
    };

    try {
        await db.update(params).promise();
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, data: { message: error['code'], status: error['statusCode'] } };
    }
};

// Get all students in the database
const readAllStudents = async () => {
    const params = {
        TableName: studentTable,
    }

    try {
        let { Items = [] } = await db.scan(params).promise()
        Items['size'] = Items.length
        console.log(Items)
        return { success: true, data: Items }
    } catch (error) {
        console.log(error)
        return { success: false, data: { message: error['code'], status: error['statusCode'] } }
    }
}

// Get a student based on name and phone number
const readStudent = async (name, number) => {
    const params = {
        TableName: studentTable,
        Key: {
            "Name": name,
            "PrimaryPhone": number
        }
    }

    try {
        const { Item = {} } = await db.get(params).promise()
        if (!isObjectEmpty(Item)) {
            return { success: true, data: Item }
        }
        return { success: false, data: { message: 'Student not found', status: 404 } }
    } catch (error) {
        console.log(error)
        return { success: false, data: { message: error['code'], status: error['statusCode'] } }
    }
}

// Delete a student based on name and number
const deleteStudent = async (name, number) => {
    const params = {
        TableName: studentTable,
        Key: {
            "Name": name,
            "PrimaryPhone": number
        }
    }

    try {
        await db.delete(params).promise()
        return { success: true }
    } catch (error) {
        console.log(error)
        return { success: false, data: { message: error['code'], status: error['statusCode'] } }
    }
}

// Check in object is an empty list of hash map
const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}

export {
    createOrUpdateStudent,
    readAllStudents,
    readStudent,
    deleteStudent,
    updateStudent,
    enrollStudent
}