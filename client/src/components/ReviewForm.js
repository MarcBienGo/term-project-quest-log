import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  ListGroup,
  Badge,
  Spinner,
} from "react-bootstrap";

const ReviewForm = ({ game }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    user: "",
    comment: "",
    score: 5.0,
  });

  const fetchReviews = async () => {
    if (!game?._id) return;
    try {
      setLoading(true);
      const response = await fetch(`/reviews/${game._id}`);
      const { data } = await response.json();
      setReviews(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [game?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const errors = [];

    if (!formData.user.trim()) {
      errors.push("Name is required");
    } else if (formData.user.trim().length > 50) {
      errors.push("Name must be 50 characters or less");
    }

    if (formData.comment.length < 5) {
      errors.push("Review must be at least 5 characters");
    } else if (formData.comment.length > 500) {
      errors.push("Review must be 500 characters or less");
    }

    const score = parseFloat(formData.score);
    if (isNaN(score) || score < 0 || score > 10) {
      errors.push("Score must be between 0 and 10");
    }

    if (errors.length > 0) {
      setError(errors.join(". "));
      return;
    }

    try {
      const response = await fetch("/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game_id: game._id,
          user: formData.user.trim(),
          comment: formData.comment.trim(),
          score: parseFloat(formData.score),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit review");
      }

      const newReview = await response.json();
      setReviews((prev) => [newReview, ...prev]);
      setFormData({ user: "", comment: "", score: 5.0 });
    } catch (err) {
      setError(err.message);
    }
  };

  if (!game) return <Alert variant="warning">No game selected</Alert>;

  return (
    <Container className="my-4">
      <Card className="mb-4">
        <Card.Header as="h3">Game Details</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Title:</strong> {game.title}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Company:</strong> {game.company}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Release Year:</strong> {game.releaseYear}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Genres:</strong> {game.genres.join(", ")}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Platforms:</strong> {game.platforms.join(", ")}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Age Rating:</strong> {game.ageRating}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header as="h3">Write a Review</Card.Header>
            <Card.Body>
              {error && (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setError(null)}
                >
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="user"
                    value={formData.user}
                    onChange={(e) =>
                      setFormData({ ...formData, user: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Rating: {formData.score.toFixed(1)}/10.0
                  </Form.Label>
                  <Form.Range
                    name="score"
                    value={formData.score}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        score: parseFloat(e.target.value),
                      })
                    }
                    min={0}
                    max={10}
                    step={0.5}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Your Review *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="comment"
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit Review
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header as="h3">
              Reviews {loading && <Spinner size="sm" animation="border" />}
            </Card.Header>
            <Card.Body>
              {reviews.length === 0 ? (
                <Alert variant="info">No reviews yet. Be the first!</Alert>
              ) : (
                <ListGroup variant="flush">
                  {reviews.map((review) => (
                    <ListGroup.Item key={review._id} className="mb-2">
                      <div className="d-flex justify-content-between">
                        <strong>{review.user || "Anonymous"}</strong>
                        <Badge bg="primary">{review.score.toFixed(1)}/10.0</Badge>
                      </div>
                      <small className="text-muted">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </small>
                      <p className="mt-2 mb-0">{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewForm;
