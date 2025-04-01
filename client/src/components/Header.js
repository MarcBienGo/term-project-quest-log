import { Navbar, Container, Nav } from "react-bootstrap";

const Header = ({ currentView, setCurrentView }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="game-header">
      <Container>
        <Navbar.Brand className="game-title">
          <span className="pixel-font">🎮 QuestLog</span> 
        </Navbar.Brand>
        <Nav>
          <Nav.Link 
            active={currentView === "game-list"} 
            onClick={() => setCurrentView("game-list")}
          >
            <span className="pixel-font">Game Library</span>
          </Nav.Link>
          <Nav.Link 
            active={currentView === "game-form"}
            onClick={() => setCurrentView("game-form")}
          >
            <span className="pixel-font">Add New Game</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;