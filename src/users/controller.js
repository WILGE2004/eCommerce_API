const debug = require("debug")("app:module-users-controller");
const { UsersService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      Response.success(res, 200, "Lista de usuarios", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      let user = await UsersService.getById(id);
      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `User ${id}`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await UsersService.create(body);
        Response.success(res, 201, "Usuario creado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, email, rol } = req.body;
      const data = { name, email, rol };
      const { id } = req.params;
      if (!data || Object.keys(data).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const user = await UsersService.updateUser(id, data);
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
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await UsersService.deleteUser(id);

      if (result.deletedCount === 1) {
        Response.success(res, 200, `Successfully deleted one user`, result);
      } else {
        Response.error(res, new createError.NotFound());
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
