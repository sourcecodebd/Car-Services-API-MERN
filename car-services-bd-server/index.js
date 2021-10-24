const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Running Car Services BD server...');
})
const uri = `${process.env.SERVER}+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.CLUSTER}/${process.env.DB}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Run_Car_Services_Own_Database = async () => {
    try {
        await client.connect();
        const database = client.db('CarMechanic');
        const servicesCollection = database.collection('Services');

        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })
        app.get('/services/details/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.send(service);
        })
        app.post('/services', async (req, res) => {
            const newService = req.body;
            const result = await servicesCollection.insertOne(newService);
            res.json(result);
        })
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servicesCollection.deleteOne(query);
            res.json(result);
        })
        app.put('/services/update/:id', async (req, res) => {
            const updatedServices = req.body;
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const option = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedServices.name,
                    price: updatedServices.price,
                    description: updatedServices.description,
                    time: updatedServices.time,
                    img_url: updatedServices.img_url
                }
            };
            const result = await servicesCollection.updateOne(filter, updateDoc, option);
            res.json(result);
        })

    }
    finally {
        // await client.close();
    }
}
Run_Car_Services_Own_Database().catch(console.dir);

app.listen(port, () => {
    console.log('Listening Car Services BD server on port ' + port);
})