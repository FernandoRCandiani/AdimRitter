import { BrowserRouter } from "react-router-dom";

import { GlobalProvider } from "./contexts/Global";
import { Rotas } from "./routes";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
