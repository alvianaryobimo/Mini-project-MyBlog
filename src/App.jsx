import Axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { setValue } from './redux/userSlice';
import { useDispatch } from "react-redux";
import { HomePage } from "./pages/home";
import { LoginbyEmail } from "./pages/loginEmail";
import { Signup } from "./pages/signup";
import { ForgotPass } from "./pages/forgot";
import { ErrorPage } from "./pages/Error";
import { Verify } from "./pages/verify";
import { useEffect } from "react";
import { Profile } from "./pages/profile";
import { AddBlog } from "./pages/addBlog";
import { DetailPage } from "./pages/detailPage";
import { Myblog } from "./pages/myBlog";
import { LoginbyUsername } from "./pages/loginUsername";
import { LoginbyPhone } from "./pages/loginPhone";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
  { path: "/loginbyEmail", element: <LoginbyEmail />, },
  { path: "/loginbyUsername", element: <LoginbyUsername />, },
  { path: "/loginbyPhone", element: <LoginbyPhone />, },
  { path: "/signup", element: <Signup />, },
  { path: "/forgotPassword", element: <ForgotPass />, },
  { path: "/verification/:token", element: <Verify />, },
  { path: "/profile", element: <Profile />, },
  { path: "/addBlog", element: <AddBlog />, },
  { path: "/myBlog", element: <Myblog />, },
  { path: "/detailPage/:id", element: <DetailPage />, },
]);
function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const keepLogin = async () => {
    try {
      const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/auth/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(setValue(response.data));
      console.log(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    keepLogin();
  }, []);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
