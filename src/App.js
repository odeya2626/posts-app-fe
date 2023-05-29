import "./App.css";
import Header from "./components/Header";
import PostList from "./components/PostList";
import ModalApp from "./components/ModalApp";
import ImageUpload from "./components/imageUpload/ImageUpload";
import { useUserContext } from "./context/UserContext";

export const BASE_URL = process.env.REACT_APP_API_URL;
function App() {
  const { currentUser } = useUserContext();

  return (
    <div className="App">
      <ModalApp />

      <Header />
      <PostList />
      {currentUser && currentUser.access_token ? (
        <ImageUpload />
      ) : (
        <h3>Sign in to see your posts</h3>
      )}
    </div>
  );
}

export default App;
