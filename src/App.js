import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import SetProfileRole from "./profile/SetProfileRole";
import UserProfile from "./profile/UserProfile";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/set_role" render={() => <SetProfileRole />} />
          <Route exact path="/profile/:id" render={() => <UserProfile />} />

          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/inbox" render={() => <h1>Inbox</h1>} />
          <Route exact path="/lessons" render={() => <h1>Lessons</h1>} />
          <Route exact path="/" render={() => <h1>Home Page</h1>} />

          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
