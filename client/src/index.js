import {createRoot} from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { Login, Register } from './pages/login_register/Login';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  <Router>
    <App />
  </Router>
);