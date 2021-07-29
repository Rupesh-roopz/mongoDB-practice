const db = require('mongodb').MongoClient;

async function onConnection(){
    const uri = 'mongodb://localhost:27017';
    const client = new db(uri);

    try {
        await client.connect();
        // await createDocument(client);
        await sampleAggregate(client)

        // const result = client.db('aggregate').collection('sample_collection')
        // .find();
        // await result.forEach((data)=>{
        //     console.log(data)
        // })
        
    }finally {
        client.close();
    }
    
}

onConnection().then(
    console.log("Connection Successfull")
).catch((e)=>{
    console.log("Error occured during Connection" + e)
})

async function sampleAggregate(client) {
    const pipeLine = [
        { $limit : 10},
        { $sort : {"pop" : -1}},
        { $skip : 5}
        
        
    ]
     const result = client.db('aggregate').collection('sample_collection')
    .aggregate(pipeLine);
     
    await result.forEach((data)=>{
        console.log(data)
    })
    }


async function createDocument(client){
    const result = await client.db('aggregate').collection('sample_collection')
    .insertMany([
        {"city" : "AGAWAM", "loc" : [ -72.622739, 42.070206 ], "pop" : 15338, "state" : "MA" },
        {"city" : "CUSHMAN", "loc" : [ -72.51564999999999, 42.377017 ], "pop" : 36963, "state" : "MA" },
        {"city" : "BARRE", "loc" : [ -72.10835400000001, 42.409698 ], "pop" : 4546, "state" : "MA" },
        {"city" : "BELCHERTOWN", "loc" : [ -72.41095300000001, 42.275103 ], "pop" : 10579, "state" : "MA" },
        {"city" : "BLANDFORD", "loc" : [ -72.936114, 42.182949 ], "pop" : 1240, "state" : "MA" }
    ])
    console.log(`${result.insertedCount} are created in this collection`);
    console.log(result.insertedIds)
}

