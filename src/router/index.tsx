import { createBrowserRouter } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import BookList from "pages/BookList";

const childrenRoutes = [
  {
    path: "/",
    element: <BookList />
  }
];

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [...childrenRoutes]
  }
];

const router = createBrowserRouter(routes);

export default router;
