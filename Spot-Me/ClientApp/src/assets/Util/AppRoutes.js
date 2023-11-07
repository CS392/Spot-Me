import { FetchData } from "../../components/FetchData";
import { Home } from "../../components/Home";
import Login from "../../pages/Login"
import SignUp from "../../pages/SignUp";
import {FriendList} from "../../pages/FriendList";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
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
  }
];

export default AppRoutes;
