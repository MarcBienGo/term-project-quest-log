import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot (document.getElementById("react-container"));
import App from './components/App.js';

root.render(<App />);