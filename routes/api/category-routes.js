const router = require("express").Router();
const { Category, Product } = require("../../models");

// Show all categories and associated products
router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Show specific category by its `id` and show associated products
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "Category ID not found." });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Create new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body); //req.body needs category_name
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update category name
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    const newCategoryName = await category.update(req.body); //req.body needs category_name
    res.status(200).json(newCategoryName);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedCat) {
      res.status(404).json({ message: "Category ID not found." });
      return;
    }
    res.status(200).json(deletedCat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
