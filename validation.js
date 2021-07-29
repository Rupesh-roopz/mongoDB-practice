const db = require('mongodb').MongoClient;

async function onConnection(){
    const uri = 'mongodb://localhost:27017';
    const client = new db(uri);

    try {
        await client.connect(); 

        const result = await client.db('employees').collection('movieTickets').insertOne({
            name:"Rupesh",
            age : 17
        })
        if(result){
            console.log("property was added")
        }else {
            console.log( "property was not added")
        }

    }catch(e){
        console.log("error : "+ e)
    }
    finally {
        client.close();
    }
    
}

onConnection().then(
    console.log("Connection Successfull")
).catch((e)=>{
    console.log("Error occured during Connection" + e)
})

async function validationFunction(client) {
    await client.db('employees').createCollection("movieTickets", {
        validator : {
            $jsonSchema : {
                bsonType : "object",
                required : ["age"],
                properties : {
                    age : {
                        bsonType : "int",
                        minimum : 18
                    }
                }
            }
        }
    })
}