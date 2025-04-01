import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { genresList, platforms } from "./gameData";

const NewGameForm = ({ setCurrentView }) => {
  const [formData, setFormData] = useState({
    title: "",
    genres: [],
    platforms: [],
    releaseYear: "2025",
    ageRating: "E",
    company: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleGenre = (genre) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((item) => item !== genre)
        : [...prev.genres, genre],
    }));
  };

  const togglePlatform = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((item) => item !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.genres.length || !formData.platforms.length) {
      return alert("Please select at least one genre and one platform");
    }

    if (formData.title.length < 2 || formData.title.length > 100) {
      return alert("Title must be between 2 and 100 characters");
    }

    try {
      const res = await fetch("/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          releaseYear: parseInt(formData.releaseYear, 10),
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      alert(`Game created: ${(await res.json()).title}`);
      setFormData({
        title: "",
        genres: [],
        platforms: [],
        releaseYear: "2025",
        ageRating: "E",
      });
      setCurrentView("game-list");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="pixel-font">Add New Game</h3>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="agdasima-bold input-label">
            Game Title:
          </Form.Label>
          <div className="col-md-2">
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter game title.."
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="agdasima-bold input-label">
            Company:
          </Form.Label>
          <div className="col-md-2">
            <Form.Control
              type="text"
              name="company"
              placeholder="Enter company name.."
              value={formData.company}
              onChange={handleInputChange}
              required
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="agdasima-bold input-label">
            Genre(s)
          </Form.Label>
          <div className="d-flex flex-wrap gap-2">
            {genresList.map((genre, index) => (
              <Button
                key={index}
                variant={
                  formData.genres.includes(genre) ? "secondary" : "outline-dark"
                }
                onClick={() => toggleGenre(genre)}
                type="button"
              >
                {genre}
              </Button>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="agdasima-bold input-label">
            Platform(s)
          </Form.Label>
          <Row>
            {platforms.map((platform, index) => (
              <Col key={index} xs={6} md={4} lg={3} className="mb-2">
                <Form.Check
                  type="switch"
                  id={`platform-${index}`}
                  label={platform}
                  checked={formData.platforms.includes(platform)}
                  onChange={() => togglePlatform(platform)}
                />
              </Col>
            ))}
          </Row>
        </Form.Group>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label className="agdasima-bold input-label">
                Release Year:
              </Form.Label>
              <Form.Control
                type="number"
                name="releaseYear"
                min="1958"
                max="2025"
                value={formData.releaseYear}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label className="agdasima-bold input-label">
                Age Rating (ESRB):
              </Form.Label>
              <Form.Select
                name="ageRating"
                value={formData.ageRating}
                onChange={handleInputChange}
              >
                <option value="E">Everyone</option>
                <option value="E10">Everyone 10+</option>
                <option value="T">Teen</option>
                <option value="M">Mature 17+</option>
                <option value="AO">Adult Only 18+</option>
                <option value="RP">Rating Pending</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button
            variant="primary"
            type="submit"
            className="px-5 py-2 game-submit-btn"
            style={{
              background:
                "linear-gradient(135deg, #7D0A0A 0%, #BF3131 50%)",
              border: "none",
              borderRadius: "30px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              fontSize: "1.2rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              color: "#fff",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              display: "inline-block",
            }}
          >
            <span className="btn-content">Create Game</span>
            <span className="btn-shine"></span>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewGameForm;
