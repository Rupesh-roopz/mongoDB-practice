const db = require("mongodb").MongoClient;

async function onConnection() {
    const uri = 'mongodb://localhost:27017';
    const client = new db(uri);

    try {
        await client.connect(); 

        // await createDocument(client);

        await client.db('coffeShops').collection("shopsInTown")
        .createIndex(
            {
                name : "text",
                description : "text"
            }
        )
        const result = client.db('coffeShops').collection("shopsInTown").find(
            // { $text : {$search : "java coffe shop"}}
            // { $text: { $search: "\"java\"" } } 
            { $text : {$search : "java coffe -shop"}}
        )
        // const result = client.db('coffeShops').collection("shopsInTown").find(
        //     { $text: { $search: "java coffee shop" } },
        //     { score: { $meta: "textScore" } }
        //  ).sort( { score: { $meta: "textScore" } } )

        if (result) {
            await result.forEach((data) => {
                console.log(data)
            })
        }

        
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

async function createDocument(client) {
    const result = await client.db('coffeShops').collection("shopsInTown").insertMany(
        [
            { _id: 1, name: "Java Hut", description: "Coffee and cakes" },
            { _id: 2, name: "Burger Buns", description: "Gourmet hamburgers" },
            { _id: 3, name: "Coffee Shop", description: "Just coffee" },
            { _id: 4, name: "Clothes Clothes Clothes", description: "Discount clothing" },
            { _id: 5, name: "Java Shopping", description: "Indonesian goods" }
        ]
    )

    if(result) {
        console.log("document sucessfully uploaded");
    } else {
        console.log("document not uploaded");
    }
}