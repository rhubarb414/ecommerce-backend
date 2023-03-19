const router = require("express").Router();
const { Category, Product } = require("../../models");

router.get("/", async (req, res) => {
  // Show all categories and associated products
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

router.get("/:id", async (req, res) => {
  // Show specific category by its `id` and show associated products
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

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body); //req.body needs category_name
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
