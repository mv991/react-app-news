import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import GeneralPage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CategoryNews from "./pages/CategoryNews";
import SingleNewsPage from "./pages/SingleNewsPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <GeneralPage />
      </>
    ),
  },
  {
    path: ":category",
    element: (
      <>
        <Navbar />
        <CategoryNews />
      </>
    ),
  },
  {
    path: "/news/:id",
    element: (
      <>
        <Navbar />
        <SingleNewsPage />
      </>
    ),
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
