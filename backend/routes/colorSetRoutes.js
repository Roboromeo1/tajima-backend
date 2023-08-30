import express from 'express';
import {
  getColorSets,
  getColorSetById,
  createColorSet,
  updateColorSet,
  deleteColorSet
} from '../controllers/colorSetController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

router.route('/')
  .get(getColorSets)
  .post(protect, admin, createColorSet);

router.route('/:id')
  .get(checkObjectId, getColorSetById)
  .put(protect, admin, checkObjectId, updateColorSet)
  .delete(protect, admin, checkObjectId, deleteColorSet);

export default router;
