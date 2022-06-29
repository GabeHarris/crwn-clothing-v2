import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./routes/home/Home.route";
import NavigationBar from "./routes/navigation-bar/NavigationBar.route";
import Authentication from "./routes/authentication/Authentication.route";
import Button from "./components/button/Button.component";

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
    <div style={{ margin: "1rem 2rem" }}>
      <h1>Fucking {word}</h1>
      <Button onClick={changeWord}>Change your word</Button>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
