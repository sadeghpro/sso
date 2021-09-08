import AccessToken from "../models/AccessToken";


async function handleUserMiddleWare(req, res, next) {
    let token = req.headers.Authorization || req.headers.authorization
    if (token.startsWith('Bearer ')) {
        token = token.substr(7);
        const result = await AccessToken.find(token);
        if (result.records.length > 0) {
            const record = result.records[0]
            req.user = record.get('u');
            req.scopes = result.records.map(r => r.get('s'));
            req.client = record.get('c');
            req.accessToken = record.get('a');
            next();
        } else {
            res.status(404);
            res.send('User not found');
        }
    } else {
        res.status(404);
        res.send('Only bearer token accepted');
    }
}


export default handleUserMiddleWare;