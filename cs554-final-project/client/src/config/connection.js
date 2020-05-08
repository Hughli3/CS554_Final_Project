import {MongoClient} from 'mongodb';

const mongoConfig = {
  serverUrl: 'mongodb://localhost:27017/',
  database: 'Chen-Xinyu-CS554-Lab1'
};

let _connection = undefined;
let _db = undefined;

export default async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useUnifiedTopology: true
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};
