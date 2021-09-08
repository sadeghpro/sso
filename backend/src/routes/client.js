import express from 'express';
import Client from '../models/Client';
import userMiddleWare from "../utils/userMiddleWare";

const router = express.Router();

router.use(userMiddleWare);
router.use((req, res, next) => {
    if (req.scopes.findIndex(scope => scope.properties.name === 'sso_admin') > 0) {
        next();
    } else {
        res.status(403);
        res.send('Forbidden');
    }
})

router.post('/', async (req, res) => {
    let client = await Client.create('name', 'url', 'type');
    res.send(client)
})

router.get('/', async (req, res) => {
    res.send({
        status: true
    })
})

export default router;
