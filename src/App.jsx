import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.service";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import config from "./config/config";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          console.log("user");
          dispatch(login({ userData: user }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => console.log("App.js Error", err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <h1>is Loading</h1>
  );
}

export default App;
