const { ObjectId } = require("mongodb");
const { Database } = require("../database/index");
const { ProductsUtils } = require("./utils");

const COLLECTION = "products";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: ObjectId(id) });
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

const updateProduct = async (id, product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.updateOne(
    { _id: ObjectId(id) },
    { $set: { ...product } }
  );
  return result;
};

const deleteProduct = async (id) => {
  const collection = await Database(COLLECTION);
  const result = await collection.deleteOne({ _id: ObjectId(id) });
  return result;
};

const generateReport = async (name, res) => {
  let products = getAll();
  ProductsUtils.excelGenerator(products, name, res);
};

module.exports.ProductsService = {
  getAll,
  getById,
  create,
  generateReport,
  updateProduct,
  deleteProduct,
};
