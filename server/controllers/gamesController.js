import { database } from "../database.js";
import { ObjectId } from 'mongodb';

const postGames = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const gamesCollection = database.collection("Games");
    const result = await gamesCollection.insertOne(req.body);

    const insertedDoc = await gamesCollection.findOne({
      _id: result.insertedId,
    });

    res.json(insertedDoc || { success: true, id: result.insertedId });
  } catch (error) {
    console.error("Full error:", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      error: "Database operation failed",
      details: error.message,
    });
  }
};

const getGames = async (req, res) => {
  try {
    const gamesCollection = database.collection("Games");
    const games = await gamesCollection.find().toArray();
    res.json(games);
  } catch (error) {
    console.error("Full error:", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      error: "Database operation failed",
      details: error.message,
    });
  }
};

const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const gamesCollection = database.collection("Games");
    
    // Check if the ID is valid (optional but recommended)
    if (!id || id.length !== 24) {
      return res.status(400).json({ error: "Invalid game ID" });
    }

    const game = await gamesCollection.findOne({ _id: new ObjectId(id) });
    
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json(game);
  } catch (error) {
    console.error("Full error:", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      error: "Database operation failed",
      details: error.message,
    });
  }
};

const searchGames = async (req, res) => {
  try {
    const { title, genres, platforms, releaseYear, ageRating } = req.query;
    const query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (genres) {
      query.genres = { $in: genres.split(",") };
    }

    if (platforms) {
      query.platforms = { $in: platforms.split(",") };
    }

    if (releaseYear) {
      query.releaseYear = parseInt(releaseYear, 10);
    }

    if (ageRating) {
      query.ageRating = ageRating;
    }

    const gamesCollection = database.collection("Games");
    const games = await gamesCollection.find(query).toArray();
    res.json(games);
  } catch (error) {
    console.error("Full error:", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      error: "Database operation failed",
      details: error.message,
    });
  }
};

export { postGames, getGames, getGameById, searchGames };
