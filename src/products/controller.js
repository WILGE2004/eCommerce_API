const debug = require("debug")("app:module-products-controller");
const { ProductsService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      Response.success(res, 200, "Lista de productos", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  getProduct: async (req, res) => {
    try {
      // const { params: { id } } = req;
      const { id } = req.params;
      let product = await ProductsService.getById(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  createProduct: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.create(body);
        Response.success(res, 201, "Producto creado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, precio, cantidad } = req.body;
      const data = { name, precio, cantidad };
      const { id } = req.params;
      if (!data || Object.keys(data).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const product = await ProductsService.updateProduct(id, data);
        console.log(product);
        if (!product) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.success(res, 200, `Product ${id} updated`, Object(data));
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await ProductsService.deleteProduct(id);

      if (result.deletedCount === 1) {
        Response.success(res, 200, `Successfully deleted one document`);
      } else {
        Response.error(res, new createError.NotFound());
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  generateReport: (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};

/* const ProductsController = {};

productsController.product = () => {}

module.exports = productsController; */
