import asyncHandler from 'express-async-handler';
import ColorSet from '../models/colorSetModel.js';

// @desc    Fetch all color sets
// @route   GET /api/colorsets
// @access  Public
const getColorSets = asyncHandler(async (req, res) => {
  const colorSets = await ColorSet.find({});
  res.json(colorSets);
});

// @desc    Fetch single color set
// @route   GET /api/colorsets/:id
// @access  Public
const getColorSetById = asyncHandler(async (req, res) => {
  const colorSet = await ColorSet.findById(req.params.id);

  if (colorSet) {
    res.json(colorSet);
  } else {
    res.status(404);
    throw new Error('Color Set not found');
  }
});

// @desc    Create a color set
// @route   POST /api/colorsets
// @access  Private/Admin
const createColorSet = asyncHandler(async (req, res) => {
  const { name, colors } = req.body;

  const colorSet = new ColorSet({
    name,
    colors,
  });

  const createdColorSet = await colorSet.save();
  res.status(201).json(createdColorSet);
});

// @desc    Update a color set
// @route   PUT /api/colorsets/:id
// @access  Private/Admin
const updateColorSet = asyncHandler(async (req, res) => {
  const { name, colors } = req.body;

  const colorSet = await ColorSet.findById(req.params.id);

  if (colorSet) {
    colorSet.name = name;
    colorSet.colors = colors;

    try {
      const updatedColorSet = await colorSet.save();
      res.json(updatedColorSet);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating color set' });
    }
  } else {
    res.status(404);
    throw new Error('Color Set not found');
  }
});

// @desc    Delete a color set
// @route   DELETE /api/colorsets/:id
// @access  Private/Admin
const deleteColorSet = asyncHandler(async (req, res) => {
  try {
    const colorSet = await ColorSet.findById(req.params.id);

    if (colorSet) {
      await ColorSet.deleteOne({ _id: colorSet._id });
      res.json({ message: 'Color Set removed' });
    } else {
      res.status(404);
      throw new Error('Color Set not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


export {
  getColorSets,
  getColorSetById,
  createColorSet,
  updateColorSet,
  deleteColorSet,
};
