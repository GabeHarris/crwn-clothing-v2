import { Routes, Route } from "react-router-dom";
import { useState, Fragment } from "react";

import Home from "./routes/home/Home";
import NavigationBar from "./routes/navigation-bar/NavigationBar";
import SignIn from "./routes/sign-in/SignIn";

const Shop = () => {
  const [word, setWord] = useState("Donkey");
  const changeWord = () => {
    if (word === "Donkey") {
      setWord("Shithead");
    } else {
      setWord("Donkey");
    }
  };
  return (
    <Fragment>
      <h1>Fucking {word}</h1>
      <button onClick={changeWord}>Change your word</button>
    </Fragment>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
