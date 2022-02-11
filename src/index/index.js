const express = require("express");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.IndexAPI = (app) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    const menu = {
      products: `https://${req.headers.host}/api/products`,
      users: `https://${req.headers.host}/api/users`,
      sales: `https://${req.headers.host}/api/sales`,
    };

    Response.success(res, 200, "eCommerce API", menu);
  });

  app.use("/", router);
};

module.exports.NotFoundAPI = (app) => {
  const router = express.Router();

  router.all("*", (req, res) => {
    Response.error(res, new createError.NotFound());
  });

  app.use("/", router);
};
