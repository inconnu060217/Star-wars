import "./App.css";
import Personnage from "./components/Personnage";
import Profil from "./components/Profil";
import { BrowserRouter as Router, Route } from "react-router-dom";
import InfosVaisseaux from "./components/InfosVaisseaux";

function App() {
  return (
    <>
      {/* <Personnage />
        <Profil /> */}
      <Router>
        <Route path="/" exact component={Personnage} />
        <Route path="/profil" component={Profil} />
        <Route path="/InfosVaisseaux" component={InfosVaisseaux} />
      </Router>
    </>
  );
}

export default App;
