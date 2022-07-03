import { useRoutes } from "react-router-dom";
import Task from "./Task/Task";

import TaskCreate from "./TaskCreate/TaskCreate";
import TaskList from "./TaskList/TaskList";

function TasksRoutes(props) {
  const routes = useRoutes([
    {
      path: '',
      element: <TaskList {...props} />
    },
    {
      path: 'create',
      element: <TaskCreate {...props} />
    },
    {
      path: ':id',
      element: <Task {...props}/>
    }
  ]);
  return routes;
}

export default TasksRoutes;