import express from 'express';
const router = express.Router();

import gamesRouter from './gamesRouter.js';
import reviewsRouter from './reviewsRouter.js';

router.use('/games', gamesRouter);
router.use('/reviews', reviewsRouter);

export default router;