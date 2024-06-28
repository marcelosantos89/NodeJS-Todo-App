const Todo = require('../models/todo');
const { validationResult } = require("express-validator");

exports.getAll = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            status: 'success',
            todos
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.insertOne = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            errors: errors.array()
        });
    }

    try {
        const todo = await Todo.create({ title: req.body.title });
        res.status(201).json({
            status: 'success',
            todo
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.toggleStatus = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            errors: errors.array()
        });
    }

    try {
        const todo = await Todo.findByIdAndUpdate(req.body.id, { status: req.body.status });

        if (!todo) {
            return res.status(404).json({
                status: 'fail',
                message: 'Todo not found'
            });
        }
        res.status(200).json({
            status: 'success',
            todo
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.removeOne = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({
                status: 'fail',
                message: 'Todo not found'
            });
        }
        res.status(204).json({
            status: 'success',
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};