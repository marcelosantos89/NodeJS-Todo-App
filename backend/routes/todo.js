const express = require("express");
const router = express.Router();

const todoController = require('../controllers/todoController');
const { todoCreateValidation, todoToggleValidation } = require('../validations/todoValidation');

router.get("/", todoController.getAll);
router.post("/add", todoCreateValidation, todoController.insertOne);
router.put("/toggle", todoToggleValidation, todoController.toggleStatus);
router.delete("/remove/:id", todoController.removeOne);

module.exports = router;