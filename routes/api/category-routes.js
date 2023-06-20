const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll(
    {
      include: {
      model: Product,
    attributes: ['product_name'],
      }
  })
  // find all categories
  // be sure to include its associated Products
  .then((categories) => res.json(categories))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
    attributes: ['category_id'],
    }
  })
  // find one category by its `id` value
  // be sure to include its associated Products
  .then((category) => res.json(category))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then((category) => res.json(category))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  }); // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
    where: {
      id: req.params.id,
    },
  })
  // update a category by its `id` value
  .then((category) => {
    if (!category) {
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }
    res.json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  // delete a category by its `id` value
  .then((category) => {
    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
