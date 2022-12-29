const express = require("express");
const {
  getAllClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
  getAllClientsBySearch,
} = require("../controllers/ClientController");

const router = express.Router();

router.route("/").get(getAllClients).post(createClient);
router.route("/:id").get(getClientById).put(updateClient);
router.route("/delete").post(deleteClient);
router.route("/search/:query").get(getAllClientsBySearch);

module.exports = router;
