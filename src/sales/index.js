const express = require("express");
const { SalesController } = require("./controller");
const router = express.Router();

module.exports.SalesAPI = (app) => {
  router
    .get("/", SalesController.getSales)
    .get("/:id", SalesController.getSale)
    .post("/", SalesController.createSale)
    //.put("/:id", SalesController.updateUser)
    .delete("/:id", SalesController.deleteSale);

  app.use("/api/sales", router);
};

//surveys@jetbrains.com -- web-help@cisco.com -- yuliv1905@gmail.com -- informes@globalmentoring.com.mx
