import { FetchData } from "../../components/FetchData";
import { Home } from "../../components/Home";
import Login from "../../pages/Login"
import SignUp from "../../pages/SignUp";

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
  }
];

export default AppRoutes;
