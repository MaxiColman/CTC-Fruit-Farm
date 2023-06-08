import * as SQLite from 'expo-sqlite';
const DBNAME = 'database.db';

const DatabaseConecction = {
getConnection: () => SQLite.openDatabase(DBNAME),
};

export default DatabaseConecction;
