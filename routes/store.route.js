const router = require("../helpers/router");

const {
  createStore,
  deleteStore,
  getStore,
} = require("../controllers/store.controller");
const authentication = require("../middlewares/authentication");
const {
  sellerAuthorization,
  buyerAuthorization,
} = require("../middlewares/authorization");

router.use(authentication);
router.get("/store/:id", buyerAuthorization, getStore);
router.use(sellerAuthorization);
router.post("/store/create", createStore);
router.delete("/store/delete/:id", deleteStore);

module.exports = router;