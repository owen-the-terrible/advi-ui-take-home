import { useState, useEffect, useRef, SyntheticEvent } from 'react';
import { BrowserRouter, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Articles from "./components/Articles"
import AllArticles from './components/AllArticles';
import SingleArticle from './components/SingleArticle';
import Root from './components/RootLayout';
import ErrorPage from './components/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Articles />

      },
      {
        path: '/all/:data',
        element: <AllArticles />

      },
      {
        path: '/article/:data',
        element: <SingleArticle/>

      },
    ],
  },
]);

export default function App() {
 return <RouterProvider router={router} /> 
}