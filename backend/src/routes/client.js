import express from 'express';
import Client from '../models/Client';

const router = express.Router();


router.post('/', (req, res) => {
    let client = Client.create('name', 'url', 'type');
    res.send(client)
})

export default router;
