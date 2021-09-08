import session from "../dbUtils";
import crypto from "crypto";

export default class Client {


    static async create(name, redirect, type) {
        const id = crypto.randomBytes(32).toString('hex');
        const secret = crypto.randomBytes(256).toString('hex');
        let result = await session().run(
            'CREATE (a:Client {name: $name, id: $id, secret: $secret, redirect: $redirect,' +
                ' type: $type, created_at: datetime(), updated_at: datetime()}) RETURN a',
            {
                name,
                redirect,
                type,
                id,
                secret,
            }
        )
        const singleRecord = result.records[0]
        const node = singleRecord.get(0)
        console.log(node);
        return {
            secret,
            id
        }
    }

}
