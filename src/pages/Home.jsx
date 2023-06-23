import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Tooltip } from "@mui/material";

import PostList from "../components/PostList";
import { useUserContext } from "../context/UserContext";

export default function Home() {
  const { currentUser, handleModalState } = useUserContext();
  return (
    <>
      <PostList />

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
    </>
  );
}
