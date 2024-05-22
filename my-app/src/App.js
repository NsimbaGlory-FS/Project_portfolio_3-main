import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? <Dashboard code={code} /> : <SignIn />;
}

export default App;
