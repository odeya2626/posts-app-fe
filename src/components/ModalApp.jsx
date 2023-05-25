import React, { useState } from "react";
import { Button, Dialog, DialogContent, Input } from "@mui/material";
import InputComponent from "./Inputs";
import { BASE_URL } from "../App";

export default function ModalApp({ handleModalState, modalState }) {
  return (
    <Dialog
      open={modalState}
      onClose={() => handleModalState(false)}
      fullWidth
      maxWidth="sm"
      className="dialog-container"
    >
      <DialogContent className="dialog-content">
        <SignIn handleModalState={handleModalState} />
      </DialogContent>
    </Dialog>
  );
}

export function SignIn({ handleModalState }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const updateUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    if (userInfo.username === "" || userInfo.password === "") {
      setMessage("Please fill in all required fields.");
      return;
    }
    try {
      let forData = new FormData();
      forData.append("username", userInfo.username);
      forData.append("password", userInfo.password);
      const reqOptions = {
        method: "POST",
        body: forData,
      };
      const response = await fetch(BASE_URL + "/login", reqOptions);
      if (response.ok) {
        const data = await response.json();

        console.log("data", data);
        handleModalState(false);
        return;
      }
      const data = await response.json();
      data.detail && setMessage(data.detail);
    } catch (err) {
      setMessage(err.toString());
    }
  };

  return (
    <form className="app_signin">
      <center>
        <img
          className="app_headerImage space-bottom"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </center>
      {/* <Input
        className="space-bottom"
        placeholder={"username"}
        type={"text"}
        name={"username"}
        value={userInfo["username"]}
        onChange={(e) => {
          updateUserInfo(e);
        }}
        required
      />
      <Input
        className="space-bottom"
        placeholder={"password"}
        type={"password"}
        name={"password"}
        value={userInfo["password"]}
        onChange={(e) => {
          updateUserInfo(e);
        }}
        required
      /> */}
      <InputComponent
        name={"username"}
        type={"text"}
        userInfo={userInfo}
        updateUserInfo={updateUserInfo}
      />
      <InputComponent
        name={"password"}
        type={"password"}
        userInfo={userInfo}
        updateUserInfo={updateUserInfo}
      />
      <Button type="submit" onClick={handleSignin}>
        Sign In
      </Button>
      {message && <p className="">{message}</p>}
    </form>
  );
}

// export const SignIn = () => {
//   const [userInfo, setUserInfo] = useState({
//     username: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");
//   const updateUserInfo = (e) => {
//     setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//   };

//   const handleSignin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(BASE_URL + "login", userInfo);
//       if (response.status !== 200) {
//         console.log("error");
//         throw new Error("Something went wrong");
//       }
//       setMessage("Success");
//     } catch (err) {
//       console.log(err);
//       setMessage(err);
//     }
//   };

//   return (
//     <form className="app_signin">
//       <center>
//         <img
//           className="app_headerImage space-bottom"
//           src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
//           alt=""
//         />
//       </center>
//       <InputComponent
//         name={"username"}
//         type={"text"}
//         userInfo={userInfo}
//         updateUserInfo={updateUserInfo}
//       />
//       <InputComponent
//         name={"password"}
//         type={"password"}
//         userInfo={userInfo}
//         updateUserInfo={updateUserInfo}
//       />
//       <Button type="submit" onClick={handleSignin}>
//         Sign In
//       </Button>
//       <p className="">{message}</p>
//     </form>
//   );
// };
