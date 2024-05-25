import SignIn from "./SignIn";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? <Home code={code} /> : <SignIn />;
}

export default App;
