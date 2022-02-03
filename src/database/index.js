const { MongoClient } = require("mongodb");
const debug = require("debug")("app:module-database");
const { Config } = require("../config/index");

var connection = null;
module.exports.Database = (collection) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!connection) { // si no existe una conexion, la genera
        const client = new MongoClient(Config.mongoUri); // Mediante el MongoClient se conecta al mongoURI
        connection = await client.connect(); // hace la conexion y la almacena en la variable
        debug("New connection created with MongoDB Atlas");
      }
      debug("Reutilizando la conexion");
      const db = connection.db(Config.mongoDbname); // conecta con el nombre de la base de datos a la que nos estamos conectando
      resolve(db.collection(collection)); // Retornarmos la colleccion a la que nos queremos conectarnos
    } catch (error) {
      reject(error);
    }
  });
