import { ObjectId, Double } from "mongodb";
import { database } from "../database.js";

const postReview = async (req, res) => {
  try {
    const reviewsCollection = database.collection("Reviews");
    const gamesCollection = database.collection("Games");

    const gameExists = await gamesCollection.findOne({ 
      _id: req.validatedReview.game_id 
    });
    
    if (!gameExists) {
      return res.status(404).json({
        error: "Game not found",
        gameId: req.validatedReview.game_id.toString(),
      });
    }

    const reviewDoc = {
      ...req.validatedReview,
      score: new Double(req.validatedReview.score),
    };

    const result = await reviewsCollection.insertOne(reviewDoc);
    const insertedDoc = await reviewsCollection.findOne({
      _id: result.insertedId,
    });

    const responseDoc = {
      ...insertedDoc,
      _id: insertedDoc._id.toString(),
      game_id: insertedDoc.game_id.toString(),
      score: insertedDoc.score,
      createdAt: insertedDoc.createdAt.toISOString(),
    };

    return res.status(201).json(responseDoc);

  } catch (error) {
    console.error("Database operation failed:", error);

    if (error.code === 121) {
      return res.status(400).json({
        error: "Database validation failed",
        details: error.errInfo?.details || error.message,
      });
    }

    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

const getGameReviews = async (req, res) => {
  try {
    const { gameId } = req.params;
    const reviewsCollection = database.collection("Reviews");
    const gamesCollection = database.collection("Games");

    let gameObjectId;
    try {
      gameObjectId = new ObjectId(gameId);
    } catch (e) {
      return res.status(400).json({
        error: "Invalid game ID format",
        details: "Game ID must be a valid MongoDB ObjectId",
      });
    }

    const gameExists = await gamesCollection.findOne({ _id: gameObjectId });
    if (!gameExists) {
      return res.status(404).json({
        error: "Game not found",
        details: `No game found with ID ${gameId}`,
      });
    }

    const reviews = await reviewsCollection
      .find({ game_id: gameObjectId })
      .sort({ createdAt: -1 })
      .toArray();

    const normalizedReviews = reviews.map((review) => ({
      _id: review._id.toString(),
      game_id: review.game_id.toString(),
      user: review.user,
      comment: review.comment,
      score: review.score, 
      createdAt: review.createdAt.toISOString(),
    }));

    res.status(200).json({
      data: normalizedReviews,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export { postReview, getGameReviews };
