const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());

//username: musicadb
//password : iM41Rl8LLMM5QBrb


const uri = `mongodb+srv://musicadb:iM41Rl8LLMM5QBrb@assignment-11.zbngn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
    try{
        await client.connect();
    const productsCollection = client.db('Musica').collection('products');

    // get all products data 
    app.get('/products', async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    // get single product data 
    app.get('/products/:id', async (req,res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const singleProduct = await productsCollection.findOne(query);
        res.send(singleProduct)
    })

    // update quantity 
    app.put('/products/:id' , async (req,res)=>{
        const id = req.params.id;
        const updatedQuantity = req.body;
        const filter = {_id: ObjectId(id)};
        const options = { upsert : true };
        const updated = {
            $set : updatedQuantity
        }
        const result = await productsCollection.updateOne(filter,updated,options);
        res.send(result);
    })


    }

    finally{

    }
}

run().catch(console.dir)






app.get('/' , (req,res)=>{
    res.send('server running')
})

app.listen(port ,()=>{
    console.log('connected');
})