const setupCollections = (database) => {
    let gamesCollection = database.createCollection("Games", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title", "genres", "platforms", "releaseYear", "ageRating", "company"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 2,
              maxLength: 100,
              description: "Title must be a string between 2 and 100 characters."
            },
            genres: {
              bsonType: "array",
              items: { bsonType: "string" },
              minItems: 1
            },
            platforms: {
              bsonType: "array",
              items: { bsonType: "string" },
              minItems: 1
            },
            releaseYear: {
              bsonType: "int",
              minimum: 1958,
              maximum: 2025
            },
            ageRating: {
              bsonType: "string",
              enum: ["E", "E10", "T", "M", "AO", "RP"]
            },
            company: {
              bsonType: "string",
              minLength: 2,
              maxLength: 50,
              description: "Company must be a string between 2 and 50 characters."
            }
          }
        }
      },
    });
  
    let reviewsCollection = database.createCollection("Reviews", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["game_id", "user", "comment", "score"],
          properties: {
            game_id: {
              bsonType: "objectId",
              description: "Must reference a valid game ObjectId.",
            },
            user: {
              bsonType: "string",
              minLength: 1,
              maxLength: 50,
              description: "User must be a string between 1 and 50 characters.",
            },
            comment: {
              bsonType: "string",
              minLength: 5,
              maxLength: 500,
              description: "Comment must be between 5 and 500 characters.",
            },
            score: {
              bsonType: "double",
              minimum: 0.0,
              maximum: 10.0,
              description: "Score must be between 0 and 10.",
            },
            createdAt: {
              bsonType: "date",
              description: "Timestamp for when the review was created.",
            },
          },
        },
      },
    });
  
    return Promise.all([gamesCollection, reviewsCollection]);
  };
  
  export default setupCollections;