import { Suspense } from "react";
import { RouterProvider } from "react-router";
import Loader from "components/common/Loader";
import router from "router";

const App = () => (
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>
);

export default App;
