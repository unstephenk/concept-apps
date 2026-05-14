import UserAdminPage from "./pages/UserAdminPage";

import { FavoritesProvider } from "./context/FavoritesContext";
import { CounterProvider } from "./context/CounterContext";

function App() {
  return (
    <CounterProvider>
      <FavoritesProvider>
        <UserAdminPage />
      </FavoritesProvider>
    </CounterProvider>
  )
}

export default App;