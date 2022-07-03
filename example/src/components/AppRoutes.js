import { useRoutes, Navigate } from "react-router-dom";

import NotFound from "./NotFound/NotFound";
import Tasks from "./Tasks/Tasks";

function AppRoutes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/task" />
    },
    {
      path: 'task/*',
      element: <Tasks />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);
  return routes;
}

export default AppRoutes;