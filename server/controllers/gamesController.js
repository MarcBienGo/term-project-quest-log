import { database } from "../database.js";

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

export { postGames, getGames, searchGames };
