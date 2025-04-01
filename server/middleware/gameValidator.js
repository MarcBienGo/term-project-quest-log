export const validateGame = (req, res, next) => {
  const { title, genres, platforms, releaseYear, ageRating, company } =
    req.body;

  if (!title || !genres || !platforms || !releaseYear || !ageRating) {
    return res
      .status(400)
      .json({
        error:
          "Missing required fields: title, genres, platforms, releaseYear, or ageRating",
      });
  }

  if (typeof title !== "string" || title.length < 2 || title.length > 100) {
    return res
      .status(400)
      .json({ error: "Title must be a string between 2 and 100 characters." });
  }

  if (
    !Array.isArray(genres) ||
    genres.length < 1 ||
    !genres.every((genre) => typeof genre === "string")
  ) {
    return res
      .status(400)
      .json({
        error: "Genres must be an array of strings with at least one item.",
      });
  }

  if (
    !Array.isArray(platforms) ||
    platforms.length < 1 ||
    !platforms.every((platform) => typeof platform === "string")
  ) {
    return res
      .status(400)
      .json({
        error: "Platforms must be an array of strings with at least one item.",
      });
  }

  if (
    typeof releaseYear !== "number" ||
    !Number.isInteger(releaseYear) ||
    releaseYear < 1958 ||
    releaseYear > 2025
  ) {
    return res
      .status(400)
      .json({
        error: "Release year must be an integer between 1958 and 2025.",
      });
  }

  const validAgeRatings = ["E", "E10", "T", "M", "AO", "RP"];
  if (!validAgeRatings.includes(ageRating)) {
    return res
      .status(400)
      .json({ error: "Age rating must be one of: E, E10, T, M, AO, or RP." });
  }

  if (
    company &&
    (typeof company !== "string" || company.length < 2 || company.length > 50)
  ) {
    return res
      .status(400)
      .json({
        error:
          "Company must be a string between 2 and 50 characters if provided.",
      });
  }

  next();
};
