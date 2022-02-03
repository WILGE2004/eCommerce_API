const debug = require("debug")("app:module-users-controller");
const { SalesService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.SalesController = {
  getSales: async (req, res) => {
    try {
      let users = await SalesService.getAll();
      Response.success(res, 200, "Lista de ventas", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  getSale: async (req, res) => {
    try {
      const { id } = req.params;
      let user = await SalesService.getById(id);
      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Sale ${id}`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  createSale: async (req, res) => {
    //Terminar
    try {
      const { user, product, stock } = req.body;
      const data = { user, product, stock };

      if (Object.keys(data).length !== 3) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await SalesService.create(data);
        Response.success(res, 201, "Venta creada", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  /*   updateUser: async (req, res) => {
    try {
      const { name, email, rol } = req.body;
      const data = { name, email, rol };
      const { id } = req.params;
      if (!data || Object.keys(data).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const user = await SalesService.updateUser(id, data);
        if (!user) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.success(res, 200, `User ${id} updated`, Object(data));
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  }, */

  deleteSale: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await SalesService.deleteSale(id);

      if (result.deletedCount === 1) {
        Response.success(res, 200, `Successfully deleted one sale`, result);
      } else {
        Response.error(res, new createError.NotFound());
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
