# Routing

*  🔖 **Installation**
*  🔖 **Routes**
*  🔖 **Enfants**

___

## 📑 Installation

De base React ne possède pas de router et il faut installer un package additionnel.

```bash
npm install react-router-dom
```

[React Router](https://reactrouter.com/)

___

## 📑 Routes

Les routes doivent être des enfants du router. Le router peut être déclaré dans le point d'entré de l'applicaiton.


```js
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

Vous pouvez ensuite déclarer des routes dans chaque composant enfant.

```js
const App = () => {
  return (
    <Routes>
      <Route path="task/*" element={<Tasks />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```
### 🏷️ **Séparation**

Il est possible de déplacer les routes dans un fichier à part.

```js
import { useRoutes } from "react-router-dom";

import NotFound from "./NotFound/NotFound";
import Tasks from "./Tasks/Tasks";

function AppRoutes() {
  const routes = useRoutes([
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
```

Il ne reste plus qu'à déclarer l'élément contenant les routes.

```js
const App = () => {
  return (
      <AppRoutes/>
  );
}
```

___

## 📑 Enfants

Nous pouvons déclarer des routes sur plusieurs niveaux. L'avantage est de pouvoir factoriser les éléments de présentation communs.

Les liens héritent de la base d'url ayant routé précédement.

```js
const Tasks = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="">Task List</Link>
          </li>
          <li>
            <Link to="create">Create Task</Link>
          </li>
        </ul>
      </nav>
      <TasksRoutes/>
    </>
  );
}
```

Ce composant enfant possède également son ficheir de routes.

```js
function TasksRoutes() {
  const routes = useRoutes([
    {
      path: '',
      element: <TaskList />
    },
    {
      path: 'create',
      element: <TaskCreate />
    },
    {
      path: ':id',
      element: <Task />
    }
  ]);
  return routes;
}

export default TasksRoutes;
```

Sur ces exemples nous avons observé la déclaration de routes imbriquées et leur découpage, les routes par défaut et le passage de paramètre de façon implicite, le reste est correctement documenté!