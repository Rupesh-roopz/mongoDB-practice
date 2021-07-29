const db = require("mongodb").MongoClient;

async function onConnection() {
    const uri = 'mongodb://localhost:27017';
    const client = new db(uri);

    try {
        await client.connect(); 
        // await locationDocument(client);

        await client.db('coffeShops').collection("shopsInTown").createIndex(
            { location : "2dsphere"}
        )
    
        const result = await client.db('coffeShops').collection("shopsInTown").find(
            {
                location : {
                    $near : {
                        $geometry : {
                            type : "Point",
                            coordinates : [-73.9667, 40.78 ]
                        },
                        $minDistance: 1000,
                        $maxDistance: 5000
                    }
                        
                } 
            }
        )

        await result.forEach((data) => {
            console.log(data)
        })


    }catch(e) {
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

async function locationDocument(client) {
    const result = await client.db('coffeShops').collection("shopsInTown").insertMany(
        [
            {
                name: "Central Park",
               location: { type: "Point", coordinates: [ -73.97, 40.77 ] },
               category: "Parks"
            },
            {
                name: "Sara D. Roosevelt Park",
                location: { type: "Point", coordinates: [ -73.9928, 40.7193 ] },
                category: "Parks"
             },
             {
                name: "Polo Grounds",
                location: { type: "Point", coordinates: [ -73.9375, 40.8303 ] },
                category: "Stadiums"
             }
        ]
    )

    if(result) {
        console.log("document sucessfully uploaded");
    } else {
        console.log("document not uploaded");
    }
}