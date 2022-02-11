const { ObjectId } = require("mongodb");
const { Database } = require("../database/index");

const P_COLLECTION = "products";
const S_COLLECTION = "sales";
const U_COLLECTION = "users";

const getAll = async () => {
  const sales = await Database(S_COLLECTION);
  return await sales.find({}).toArray();
};

const getById = async (id) => {
  const sales = await Database(S_COLLECTION);
  return await sales.findOne({ _id: ObjectId(id) });
};

const foundUser = async (id_user) => {
  try {
    const user = await Database(U_COLLECTION);
    const validateUser = await user.findOne({ _id: ObjectId(id_user) });

    if (validateUser === null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    if (error) {
      return false;
    }
  }
};

const foundProduct = async (id_product) => {
  try {
    const product = await Database(P_COLLECTION);
    const validateProduct = await product.findOne({
      _id: ObjectId(id_product),
    });

    if (validateProduct === null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    if (error) {
      return false;
    }
  }
};

const doSale = async (id_product, stock) => {
  try {
    const product = await Database(P_COLLECTION);
    const result = await product.findOne({ _id: ObjectId(id_product) });
    if (result.cantidad >= stock) {
      const total = result.precio * stock;
      return `$${total}`;
    } else {
      return false;
    }
  } catch (error) {
    if (error) {
      return false;
    }
  }
};

const updateProduct = async (id_product, stock) => {
  const collection = await Database(P_COLLECTION);
  const product = await collection.findOne({ _id: ObjectId(id_product) });
  const cantidad = product.cantidad - stock;
  const data = { ...product, cantidad };

  let result = await collection.updateOne(
    { _id: ObjectId(id_product) },
    { $set: { ...data } }
  );
  return result;
};

const create = async (oneSale) => {
  const user = await foundUser(oneSale.user);
  const product = await foundProduct(oneSale.product);
  const total = await doSale(oneSale.product, oneSale.stock);

  if (!user) {
    return "User NOT found";
  } else if (!product) {
    return "Product NOT found";
  } else if (!total) {
    return "Error.. Sale NOT made due to lack of product";
  } else {
    const data = { ...oneSale, total };
    const sales = await Database(S_COLLECTION);
    let result = await sales.insertOne(data);
    await updateProduct(oneSale.product, oneSale.stock);
    return result.insertedId;
  }
};

const deleteSale = async (id) => {
  const collection = await Database(S_COLLECTION);
  const result = await collection.deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports.SalesService = {
  getAll,
  getById,
  create,
  deleteSale,
};
