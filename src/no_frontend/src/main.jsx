import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Huesped from './Huesped';
import HuesRes from './HuesRes';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/huesped",
    element: <Huesped></Huesped>
  },
  {
    path: "/rh",
    element: <HuesRes></HuesRes>
  }

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
