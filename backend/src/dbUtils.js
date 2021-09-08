import neo4j from "neo4j-driver";

let driver;
let session;
export default function getSession() {
    if (!driver || !driver.open) {
        driver = neo4j.driver(process.env.NEO4j_URI ?? 'bolt://localhost:7687',
            neo4j.auth.basic(process.env.NEO4j_USER ?? 'neo4j', process.env.NEO4j_PASS ?? '123'));
    }
    if (!session || !session.open) {
        session = driver.session();
    }
    return session;
}
