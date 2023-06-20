const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
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
    include: [Product],
  })
  // find one category by its `id` value
  // be sure to include its associated Products
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

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((category) => res.status(201).json(category))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  }); // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  // update a category by its `id` value
  .then((category) => {
    if (!category[0]) {
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
