// Packages
const { Op } = require("sequelize");
// Models
const { Store } = require("../models");
// Helpers
const statusMessage = require("../helpers/status.message");

module.exports = {
  createStore: async (req, res) => {
    try {
      const UserId = req.decoded.id;
      const payload = { UserId, ...req.body };

      const store = await Store.create(payload);

      statusMessage(res, 201, true, "Store created!", store);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  getStore: async (req, res) => {
    try {
      const id = req.params.id;

      const store = await Store.findOne({ where: { id: { [Op.eq]: id } } });

      statusMessage(res, 201, true, "Get Store!", store);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  deleteStore: async (req, res) => {
    try {
      const id = req.params.id;

      const store = await Store.destroy({ where: { id } });

      statusMessage(res, 201, true, "Delete store successfull!", store);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
};