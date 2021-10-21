const db = require('mongodb').MongoClient;
// Connecting to database
async function connection(){ 
    const uri = 'mongodb://localhost:27017';
    const client =new db(uri);
    try{
       await client.connect();
       
        await createListing(client,{
           employeeName :'Rupesh',
           age:24,
       })
       await createMultipleListings(client,[{
           employeeName : "Someone1",
           age :24
       },
       {
        employeeName : "Someone2",
            age :25
        },
        {
            employeeName : "Someone3",
            age :24
        }]);

    // await findOneCollection(client, "Rupesh")
    // await findCollection(client)
   
    
    await inventoryListings(client, [
        {
          item: 'journal',
          qty: 25,
          size: { h: 14, w: 21, uom: 'cm' },
          status: 'A'
        },
        {
          item: 'notebook',
          qty: 50,
          size: { h: 8.5, w: 11, uom: 'in' },
          status: 'A'
        },
        {
          item: 'paper',
          qty: 100,
          size: { h: 8.5, w: 11, uom: 'in' },
          status: 'D'
        },
        {
          item: 'planner',
          qty: 75,
          size: { h: 22.85, w: 30, uom: 'cm' },
          status: 'D'
        },
        {
          item: 'postcard',
          qty: 45,
          size: { h: 10, w: 15.25, uom: 'cm' },
          status: 'A'
        }

      ]);

    // await finding(client)
    // await updateSingleDocument(client)
    // await updateSingleDocument(client)
    await deleteCollection(client)
    //updated check
    // const check = await client.db('employees').collection('employee1').findOne({
    //     employeeName :'Rupesh'
    // })
    // console.log(check)

    }catch(e){
        console.log("error"+e)
    }finally{
       await client.close();
    }
}
connection().then(()=>console.log("connection successfull"))
.catch((err)=>{
    console.log("error")
})

//Createing a list
async function createListing(client, newListing) {
    const result = await client.db("employees").collection("employee1")
    .insertOne(newListing);

    // console.log(`new listing was created with id ${result.insertedId}`)
    
}

// create multiple Listings
async function createMultipleListings(client, newListing) {
    const result = await client.db("employees").collection("employee2")
    .insertMany(newListing);

    // console.log(`${result.insertedCount} are created in this collection`);
    // console.log(result.insertedIds)
}

//createing inventory listing
async function inventoryListings(client, newListing) {
    const result = await client.db("employees").collection("inventory")
    .insertMany(newListing);

    // console.log(`${result.insertedCount} are created in this collection`);
    // console.log(result.insertedIds)
}

//finding a list with name
async function findOneCollection(client, nameOfListing){
   const result = await client.db('employees').collection('employee1').findOne({
    employeeName:nameOfListing})

   if(result) {
    console.log(`listing with employee name ${nameOfListing} is found`)
    console.log(result)
   }else {
       console.log("not Found")
   }
}

//finding the whole list with collection name
async function findCollection(client) {
    const result = await client.db('employees').collection('employee2').findOne({})
    if(result){
        console.log(result)
    }else{
        console.log("not Found")
    }
}

async function finding(client) {
    const result = await client.db("employees").collection('inventory').findOne({ status: 'A'});

    //and condition
    const andCondition = await client.db("employees").collection('inventory').findOne({ 
        status: 'B',
        qty :{$lt :  30}
    })

    //or Condition
    const orCondition = await client.db("employees").collection('inventory').findOne({
        $or : [{status: 'A'}, {qty :{$lt :  30}}]
    })

    //and as well as or condition
    const Condition = await client.db("employees").collection('inventory').findOne({
        qty :25,
        $or : [{status: 'A'}, {qty :{$lt :  30}}]
    })
    if(Condition){
        console.log(`listing is found`)
        console.log(Condition)
    } else {
        console.log("list not found")
    }
    
}

//Update

async function updateSingleDocument(client){
    //update one 
    const resultUpdateOne = await client.db("employees").collection('inventory').updateOne(
        { item : 'journal' },
        {
            $set : { qty: 50, status:'c' }
        }
    )

    //update many
    const resultUpdatemany = await client.db("employees").collection('inventory').updateMany(
        { qty :{$lte : 50}},
        {
            $set : { qty: 45, status:'c' }
        }
    )

    //replace one
    const resultReplaceOne = await client.db("employees").collection('inventory').replaceOne(
        { qty : 50 },
        {
            qty : 50,
            health : "aspirine"
        }
    )
    if(resultReplaceOne) {
        console.log("updated sucessfully")
    }
}

//delete
async function deleteCollection(client) {
    const result = await client.db('employees').collections('inventory').deleteMany({
        item: 'paper',
    });
    if( result ) {
        console.log("deleted")  
    } else {
        console.log("err")
    }
}