import express from 'express';
import { postReview, getGameReviews } from '../controllers/reviewsController.js';
import { validateReview } from '../middleware/reviewValidator.js';

const reviewsRouter = express.Router();

reviewsRouter.post('/', validateReview, postReview);
reviewsRouter.get('/:gameId', getGameReviews);

export default reviewsRouter;