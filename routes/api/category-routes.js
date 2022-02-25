const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll(
      {
        attributes: ['id', 'category_name'],
        include: {
          model: Product,
          attributes: ['product_name']
        }
      });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    try {
      const oneData = await Category.findByPk(req.params.id, {
          attributes: ['id', 'category_name'],
          include: {
            model: Product,
            attributes: ['product_name']
          } 
      });
  
      if (!oneData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
  
      res.status(200).json(oneData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateData = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
      where: {
        id: req.params.id
      }
    });if (!updateData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(updateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json({message: 'The category was deleted from the database.'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
