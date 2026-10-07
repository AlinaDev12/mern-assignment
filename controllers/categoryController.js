const Category = require("../models/categoryModel");
const { deleteFile } = require("../utils/fileHelper");

// CREATE CATEGORY
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        let image = null;

        if (req.file) {
            image = "uploads/" + req.file.filename;
        }

        const category = await Category.create({
            name,
            description,
            image
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });

    } catch (error) {

        if (req.file) {
            deleteFile(req.file.filename);
        }

        res.status(400).json({
            success: false,
            message: "Category creation failed",
            error: error.message
        });
    }
};


// GET ALL CATEGORIES
const getCategories = async (req, res) => {
    try {

        const categories = await Category.find();

        res.status(200).json({
            success: true,
            categories
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to get categories",
            error: error.message
        });
    }
};


// UPDATE CATEGORY
const updateCategory = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, description } = req.body;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        category.name = name || category.name;
        category.description = description || category.description;

        if (req.file) {

            if (category.image) {
                deleteFile(category.image.replace("uploads/", ""));
            }

            category.image = "uploads/" + req.file.filename;
        }

        await category.save();

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Category update failed",
            error: error.message
        });
    }
};


// DELETE CATEGORY
const deleteCategory = async (req, res) => {
    try {

        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        if (category.image) {
            deleteFile(category.image.replace("uploads/", ""));
        }

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Category deletion failed",
            error: error.message
        });
    }
};


module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};
