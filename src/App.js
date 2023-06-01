import "./App.css";
import Header from "./components/Header";
import PostList from "./components/PostList";
import ModalApp from "./components/ModalApp";
import ImageUpload from "./components/imageUpload/ImageUpload";
import { useUserContext } from "./context/UserContext";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton, Tooltip } from "@mui/material";
export const BASE_URL = process.env.REACT_APP_API_URL;
function App() {
  const { currentUser, handleModalState } = useUserContext();
  console.log("app");
  return (
    <div className="App">
      <ModalApp />

      <Header />
      <PostList />
      {/* {currentUser && currentUser?.access_token ? (
        <ImageUpload />
      ) : ( */}
      <div
        className="edit-icon-container"
        onClick={() =>
          handleModalState(
            true,
            currentUser?.access_token ? "imageUpload" : "signin"
          )
        }
      >
        <Tooltip title="Post">
          <ModeEditIcon className="edit-icon" />
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
