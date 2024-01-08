/* eslint-disable react/jsx-no-undef */
import "./App.css";
import { ContactPage } from "./pages/contact/ContactPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { BookingDetailPage } from "./pages/details/BookingDetailPage";
import { BookingPage } from "./pages/booking/BookingPage";
import { LoginPage } from "./pages/login/LoginPage";
import { EditUserPage } from "./pages/user/EditUserPage";
import { NewUserPage } from "./pages/user/NewUserPage";
import { NewRoomPage } from "./pages/rooms/NewRoomPage";
import { RoomsListPage } from "./pages/rooms/RoomsListPage";
import { Root } from "./pages/root/Root";
import { UserPage } from "./pages/user/UserPage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import users from "./data/users.json";
import { EditRoomsPage } from "./pages/rooms/EditRoomsPage";
import AuthContext from "./AuthContext";
import { NewBookingPage } from "./pages/booking/NewBookingPage";
import { store } from "./app/store";
import { Provider } from "react-redux";
import RouteProtected from "./RouteProtected";
import { toast } from "react-toastify";

function App() {
  let checkLogin: boolean = false;
  const [userLogin, setUserLogin] = useState<string>("");
  const navigate = useNavigate()

  if (window.location.pathname !== "/login") {
    localStorage.setItem("lastRoute", window.location.pathname);
  }
  

  useEffect(() => {
    const userLogged: string | null = localStorage.getItem("token");
    userLogged && setUserLogin(userLogged), (checkLogin = true);
  }, []);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch("https://k9mgwp50x0.execute-api.eu-south-2.amazonaws.com/dev" + "/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: (e.target as any)[0].value,
          password: (e.target as any)[1].value
        })
      })

      if (response.ok) {
        console.log(response)
        const data = await response.json()
        localStorage.setItem("token", data);
        checkLogin = true;
        

      } else {
        console.log(response)
        toast.error("Invalid username or password", {
          position: "bottom-center",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
        checkLogin = false;
      }
    } catch (e) {
      console.error("Error", e)
    }
  };

  return (
    <div className="app">
      <Provider store={store}>
        <AuthContext.Provider value={{ userLogin }}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={
                  <LoginPage
                    handleOnSubmit={handleOnSubmit}
                    checkLogin={checkLogin}
                    userLogin={userLogin}
                  />
                }
              />

              <Route path="/" element={<RouteProtected />}>
                <Route path="/createUser" element={<NewUserPage />} />
                <Route path="/createUser/:id" element={<EditUserPage />} />
                <Route path="/createRoom" element={<NewRoomPage />} />
                <Route path="/createRoom/:id" element={<EditRoomsPage />} />
                <Route path="/createBooking/" element={<NewBookingPage />} />
                <Route path="/" element={<Root />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="booking" element={<BookingPage />} />
                  <Route path="booking/:id" element={<BookingDetailPage />} />
                  <Route path="rooms" element={<RoomsListPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="users" element={<UserPage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
