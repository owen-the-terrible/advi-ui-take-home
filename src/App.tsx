import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingleArticle from "./components/SingleArticle";
import AllArticles from "./components/AllArticles";
import ErrorPage from "./components/ErrorPage";
import Articles from "./components/Articles";
import Root from "./components/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Articles />,
      },
      {
        path: "/all/:data",
        element: <AllArticles />,
      },
      {
        path: "/article/:data",
        element: <SingleArticle />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
