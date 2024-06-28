const { body } = require("express-validator");

const todoCreateValidation = [
    body("title")
        .exists()
        .withMessage("Task is required")
        .isString()
        .withMessage("User name should be string"),

    body("status")
        .optional()
        .isBoolean(),
];

const todoToggleValidation = [
    body("id")
        .exists()
        .withMessage("ID is required"),

    body("status")
        .exists()
        .isBoolean(),
];

module.exports = {
    todoCreateValidation,
    todoToggleValidation
};