import { ObjectId } from "mongodb";

export const validateReview = (req, res, next) => {
  const { game_id, user, comment, score } = req.body;
  const errors = [];

  try {
    new ObjectId(game_id);
  } catch (e) {
    errors.push("Invalid game ID format");
  }

  if (
    !user ||
    typeof user !== "string" ||
    user.trim().length < 1 ||
    user.trim().length > 50
  ) {
    errors.push("User must be 1-50 characters");
  }

  if (
    !comment ||
    typeof comment !== "string" ||
    comment.trim().length < 5 ||
    comment.trim().length > 500
  ) {
    errors.push("Comment must be 5-500 characters");
  }

  const numericScore = parseFloat(score);
  if (isNaN(numericScore)) {
    errors.push("Score must be a number");
  } else {
    if (numericScore < 0 || numericScore > 10) {
      errors.push("Score must be between 0.0 and 10.0");
    }
    if (Math.round(numericScore * 2) !== numericScore * 2) {
      errors.push("Score must be in 0.5 increments");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  }

  req.validatedReview = {
    game_id: new ObjectId(game_id),
    user: user.trim(),
    comment: comment.trim(),
    score: numericScore,
    createdAt: new Date(),
  };

  next();
};
