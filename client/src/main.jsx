import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx'
import Home from './pages/Home';
import Error from './pages/Error';
import Game from './pages/Game';
import Login from './pages/Login';
import Logout from './pages/Logout';
import GameHistory from './pages/GameHistory';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/game',
        element: <Game />
      },
      {
        path: '/game-history',
        element: <GameHistory />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/logout',
        element: <Logout />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)