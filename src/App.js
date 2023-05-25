import "./App.css";
import Header from "./components/Header";

import PostList from "./components/PostList";
import { useState } from "react";

import ModalApp from "./components/ModalApp";

export const BASE_URL = "http://127.0.0.1:8000";
function App() {
  const [openModal, setOpenModal] = useState(false);
  console.log(process.env.REACT_APP_API_URL);
  const handleModalState = (state) => {
    setOpenModal(state);
  };

  return (
    <div className="App">
      <ModalApp handleModalState={handleModalState} modalState={openModal} />

      <Header handleModalState={handleModalState} />
      <PostList />
    </div>
  );
}

export default App;
