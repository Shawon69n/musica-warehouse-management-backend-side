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
    // const addProductCollection = client.db('Musica').collection('addproduct');

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

    //add product
    app.post('/products' , async (req,res) =>{
        const newProduct = req.body;
        const result = await productsCollection.insertOne(newProduct);
        res.send(result)
    })

    // myProduct api
    // app.get('/addproduct',async(req,res) =>{
    //     const email = req.query.email;  
    //     const query = {email: email};
    //     const cursor = addProductCollection.find(query);
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })
    app.get('/myproducts', async (req, res) => {
        const email = req.query.email
        const query = { email: email };
        const cursor = productsCollection.find(query);
        const result = await cursor.toArray()
        res.send(result)
    })




    // checking heroku 
    app.get('/hero' , (req,res) =>{
        res.send('im not a hero')
    })
    


    //Delete product
    app.delete('/products/:id' , async (req,res) =>{
        const id = req.params.id;
        const deleteQuery = {_id: ObjectId(id)};
        const result = await productsCollection.deleteOne(deleteQuery);
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