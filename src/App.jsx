import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import { GlobalProvider } from "./contexts/Global";
import { Rotas } from "./routes";
import { queryClient } from "./services/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <BrowserRouter>
          <Rotas />
        </BrowserRouter>
      </GlobalProvider>
    </QueryClientProvider>
  );
}

export default App;
