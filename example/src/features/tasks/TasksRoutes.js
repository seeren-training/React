import { useRoutes } from "react-router-dom";

import Task from "./task/Task";
import TaskCreate from "./task-create/TaskCreate";
import TaskList from "./task-list/TaskList";

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