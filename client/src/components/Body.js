import { useState } from "react";
import Header from "./Header";
import NewGameForm from "./NewGameForm";
import GameList from "./GameList";
import ReviewForm from "./ReviewForm";
import Footer from "./Footer";

const Body = () => {
  const [currentView, setCurrentView] = useState("game-list");
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="page-container">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="body-content">
        {currentView === "game-form" ? (
          <NewGameForm setCurrentView={setCurrentView} />
        ) : currentView === "review-form" ? (
          <ReviewForm 
            game={selectedGame} 
            setCurrentView={setCurrentView} 
          />
        ) : (
          <GameList 
            setCurrentView={setCurrentView}
            setSelectedGame={setSelectedGame}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Body;