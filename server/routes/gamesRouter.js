import express from 'express';
import { postGames, getGames, getGameById, searchGames } from '../controllers/gamesController.js';
import { validateGame } from '../middleware/gameValidator.js';

const gamesRouter = express.Router();

gamesRouter.post('/', validateGame, postGames);
gamesRouter.get('/', getGames);
gamesRouter.get('/:id', getGameById);
gamesRouter.get('/search', searchGames);

export default gamesRouter;