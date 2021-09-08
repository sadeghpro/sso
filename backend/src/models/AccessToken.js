import session from "../utils/db";


export default class AccessToken {


    static async find(token) {
        return session().run(
            'match (a:AccessToken)<-[:USER_TOKEN]-(u:User) where a.token = $token and a.revoke = 0 ' +
            'match (a)<-[:CLIENT_TOKEN]-(c:Client) ' +
            'optional match (a)<-[:SCOPE_ACCESS_TOKEN]-(s:Scope) ' +
            'return a, u, c, s',
            {token}
        );
    }
}