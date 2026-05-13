import UserAdminPage from "./pages/UserAdminPage";

import {FavoritesProvider} from "./context/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <UserAdminPage />
    </FavoritesProvider>
  )
}

export default App;