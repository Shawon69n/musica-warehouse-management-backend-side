const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
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
    const serviceCollection = client.db('Musica').collection('products');

    app.get('/products', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
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