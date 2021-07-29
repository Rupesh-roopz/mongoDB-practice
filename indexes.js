const db = require('mongodb').MongoClient;

async function onConnection(){
    const uri = 'mongodb://localhost:27017';
    const client = new db(uri);

    try {
        await client.connect(); 

        // await createDocument(client);

        // await client.db('indexes').collection('sample_index').createIndex(
        //     {score : 1},
        //     { name : "query for indexes"}
        // )
        const result = client.db('indexes').collection('sample_index').find({score : 1036})
        if(result) {
            await result.forEach((data) =>{
                console.log(data)
            })
        } else {
            console.log("not found")
        }
        //THis is only Mongosh method not works in Node.js divers
        // const result = await client.db('indexes').collection('sample_index').getIndexes();
        // console.log(result)
        
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

async function createDocument(client) {
    const result = await client.db("indexes").collection("sample_index").insertMany([
        {
            "score": 1034,
            "location": { state: "NY", city: "New York" }
        },
        {
            "score": 1036,
            "location": { state: "NY", city: "New York" }
        },
        {
            "score": 1036,
            "location": { state: "NY", city: "New York" }
        }
    ])
        
    if(result) {
        console.log("Document is created");
    } else {
        console.log("Document is NOT created");
    }
}
