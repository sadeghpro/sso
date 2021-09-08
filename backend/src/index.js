import express from 'express';
import client from './routes/client';

const app = express();

app.use('/client', client);

const server = app.listen(process.env.PORT ?? 5000, function () {
    const host = server.address().address
    const port = server.address().port

    console.log("app listening at http://%s:%s", host, port)

})
