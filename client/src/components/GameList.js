import { useEffect, useState } from "react";
import { Button, Card, ListGroup, Spinner, Alert } from "react-bootstrap";

const GameList = ({ setCurrentView, setSelectedGame }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setCurrentView("review-form");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/games');
        if (!res.ok) throw new Error('Failed to fetch');
        setGames(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="pixel-font">Game Catalog</h3>
      </div>

      <div className="row">
        {games.map(game => (
          <div key={game._id} className="col-md-4 mb-4">
            <Card
              onClick={() => handleGameClick(game)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{game.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {game.releaseYear} | {game.ageRating}
                </Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item>Genres: {game.genres.join(", ")}</ListGroup.Item>
                  <ListGroup.Item>Platforms: {game.platforms.join(", ")}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;