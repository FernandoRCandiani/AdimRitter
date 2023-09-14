import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { Rotas } from "./routes";
import { fetchRefreshToken } from './services/fetches';

function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRefreshToken()
        .then(response => setToken(response.token));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  );
}

export default App;
