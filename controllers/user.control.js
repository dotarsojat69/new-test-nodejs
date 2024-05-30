// Packages
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Models
const { User, Store } = require("../models");
// Helpers
const statusMessage = require("../helpers/status.message");
// ENV
const secretKey = process.env.SECRET_KEY;

module.exports = {
  register: async (req, res) => {
    try {
      const payload = req.body;

      const user = await User.create(payload);

      statusMessage(res, 201, true, "Register success!", user);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (user) {
        const comparePassword = await bcrypt.compare(password, user.password);

        if (comparePassword) {
          const payloadToken = {
            id: user.id,
            email: user.email,
            role: user.role,
          };

          const token = jwt.sign(payloadToken, secretKey, { expiresIn: "15m" });
          const refreshToken = jwt.sign(payloadToken, secretKey, {
            expiresIn: "2d",
          });

          const resData = {
            id: user.id,
            name: user.firstName,
            token, // store in localStorage (client side)
            refreshToken,
          };

          // Client side
          /*
          1. check token apakah masih valid atau sudah expired?
          2. gunakan refreshToken (check refresh token masih valid atau expired) untuk generate token baru
          3. generate token baru
          */

          statusMessage(res, 200, true, "Sign in success!", resData);
        } else {
          statusMessage(res, 400, false, "Email or password wrong!");
        }
      } else {
        statusMessage(res, 400, false, "Email or password wrong!");
      }
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  getUser: async (req, res) => {
    try {
      const id = req.params.id;

      const user = await User.findByPk(id, {
        include: [{ model: Store }],
      });

      statusMessage(res, 201, true, "Get user successfull!", user);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const payload = req.body;

      const user = await User.update(payload, { where: { id } });

      statusMessage(res, 201, true, "Update user successfull!", user);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;

      const user = await User.destroy({ where: { id } });

      statusMessage(res, 201, true, "Delete user successfull!", user);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
};