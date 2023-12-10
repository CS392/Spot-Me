import { Home } from "../../components/Home";
import Login from "../../pages/Login"
import SignUp from "../../pages/SignUp";
import {FriendList} from "../../pages/FriendList";
import {FriendPage} from "../../pages/FriendPage";
import {TrackerPage} from "../../pages/TrackerPage";
import {ProfilePage} from "../../pages/ProfilePage";
import {ExercisePage} from "../../pages/ExercisePage";
import Error from "../../components/Error";
import MapPage from "../../pages/MapPage";
import LandingPage from "../../pages/LandingPage";

// Routes for application to iterate over
const AppRoutes = [
  {
    index: true,
    element: <LandingPage/>
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/*',
    element: <Error/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/friends',
    element: <FriendList/>
  },
  {
    path: '/tracker',
    element: <TrackerPage/>
  },
  {
    path: '/profile',
    element: <ProfilePage/>
  },
  {
    path: '/map',
    element: <MapPage/>
  },
  {
    path: '/exercise/*',
    element: <ExercisePage/>
  },
  {
    path: `/user/*`,
    element: <FriendPage/>
  },
];

export default AppRoutes;
