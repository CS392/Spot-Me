import { FetchData } from "../../components/FetchData";
import { Home } from "../../components/Home";
import Login from "../../pages/Login"
import SignUp from "../../pages/SignUp";
import {FriendList} from "../../pages/FriendList";
import {FriendPage} from "../../pages/FriendPage";
import {TrackerPage} from "../../pages/TrackerPage";
import {ProfilePage} from "../../pages/ProfilePage";
import MapPage from "../../pages/MapPage";
const AppRoutes = [
  {
    index: true,
    element: <Home />
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
    path: `/user/*`,
    element: <FriendPage/>
  },
  {
    path: '/map',
    element: <MapPage/>
  }
];

export default AppRoutes;
