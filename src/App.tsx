import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import LoginPage from "./pages/login-page/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./hooks/useAuth";
import ProtectedRoute from "./services/ProtectedRoute";
import NewsPage from "./pages/news-page/NewsPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePage from "./pages/home-page/HomePage";
import SourcesPage from "./pages/sources-page/SourcesPage";
import ProfilePage from "./pages/profile-page/ProfilePage";

function App() {
  return (
    <Provider store={store}>
      <div className="max-w-7xl mx-auto">
        <UserProvider>
          <Header />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sources" element={<ProtectedRoute><SourcesPage /></ProtectedRoute>} />
            <Route path="/news/:source" element={<ProtectedRoute><NewsPage /></ProtectedRoute>} />
            <Route path="/my-profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </UserProvider>
      </div>
    </Provider>
  );
}

export default App;
