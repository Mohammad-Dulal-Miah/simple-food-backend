const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb')

const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

//MongoDb atlas

const uri = 'mongodb+srv://admin:admin@cluster0.t7rgz1u.mongodb.net/?retryWrites=true&w=majority'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = await client.db('foods').collection('information');

    app.post('/foods/information' , async(req,res)=>{

        const data = req.body;
        const result = await database.insertOne(data);
        const cursor = database.find({});
        const result1 = await cursor.toArray();

        res.send({message: "Data insert successfully" , result1: result1})
    })

    app.get('/foods/information', async(req,res)=>{

        const cursor = database.find({});
        const result = await cursor.toArray();
        res.send(result);
    })

   

  } finally {
    // // Ensures that the client will close when you finish/error
    // await client.close()
  }
}
run().catch(console.dir)

app.listen(port, (req, res) => {
  console.log(`server is running and port number is ${port}`)
})
