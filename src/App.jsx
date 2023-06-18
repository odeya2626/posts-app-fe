import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Tooltip } from "@mui/material";

import "./App.css";
import Header from "./components/Header";
import PostList from "./components/PostList";
import ModalApp from "./components/ModalApp";
import { useUserContext } from "./context/UserContext";
import Profile from "./components/profile/Profile";

function App() {
  const { currentUser, handleModalState } = useUserContext();

  return (
    <div className="App">
      <ModalApp />

      <Header />
      {/* <PostList /> */}
      <Profile />
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
