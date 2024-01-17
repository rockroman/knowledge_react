import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import SetProfileRole from "./profile/SetProfileRole";
import UserProfile from "./profile/UserProfile";
import LessonCreateForm from "./lessons/LessonCreateForm";
import LessonDetail from "./lessons/LessonDetail";
import LessonsPage from "./lessons/LessonsPage";
import { useCurrentUserProfile } from "./context/CurrentUserProfileContext";
import LessonEditForm from "./lessons/LessonEditForm";
import Inbox from "./inbox/Inbox";

function App() {
  // const currentUserProfile = useCurrentUserProfile();
  // const profileRole = currentUserProfile?.role || "";
  // console.log("role in App:", profileRole);
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/set_role" render={() => <SetProfileRole />} />
          <Route exact path="/profile/:id" render={() => <UserProfile />} />
          <Route
            exact
            path="/lesson/create"
            render={() => <LessonCreateForm />}
          />

          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/inbox" render={() => <Inbox />} />
          <Route
            exact
            path="/lessons"
            render={() => <LessonsPage message="No results" />}
          />
          <Route exact path="/lesson/:id" render={() => <LessonDetail />} />
          <Route
            exact
            path="/lesson/:id/edit"
            render={() => <LessonEditForm />}
          />
          <Route exact path="/" render={() => <h1>Home Page</h1>} />

          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
