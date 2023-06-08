import * as SQLite from 'expo-sqlite';
const DBNAME = 'database.db';

const DatabaseConecction = {
    getConnection: () => SQLite.openDatabase(DBNAME),
    closeConnection: () => SQLite.closeDatabase(DBNAME),

}

export default DatabaseConecction;