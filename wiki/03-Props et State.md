# Props et State

*  🔖 **Props**
*  🔖 **State**
*  🔖 **Hook**

La syntaxe des template nous permet d'atteindre nos objectifs fonctionnels. Dans un template, les attributs et méthodes du composant sont disponibles.

___

## 📑 Props

Lorsque React rencontre un élément représentant un composant défini par l’utilisateur, il transmet les attributs JSX et les enfants à ce composant sous la forme d’un objet unique. Nous appelons cet objet « props ».

[Props](https://fr.reactjs.org/docs/components-and-props.html)

```js
ReactDOM.render(
  <Welcome name="Sara" />,
  document.getElementById('root')
);
```

C'est un passage d'argument descendant en utilisant les attributs personnalisés de l'élément.

```js
function Welcome(props) { 
  return <h1>Bonjour, {props.name}</h1>;
}
```

### 🏷️ **Routing**

Quand vous routez un composant vous pouvez également faire passer les props.


```js
const board = {
  todo: [],
  doing: [],
  done: []
};

const Tasks = () => {
  return (
    <TasksRoutes board={board} />
  );
}
```

```js
TasksRoutes = (props) => {
  const routes = useRoutes([
    {
      path: '',
      element: <TaskList {...props} />
    }
  ]);
  return routes;
}
```

Le composant `TaskList` recevra les props définies par `Tasks` par le biais de `TasksRoutes`.

### 🏷️ **Lecture**

Que vous déclariez un composant sous forme de fonction ou de classe, il ne doit jamais modifier ses propres props.

```js
function sum(a, b) {
  return a + b;
}
```

La fonction précédente est pure, pas de changement d'état contrairement à la suivante.

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

___

## 📑 State

Comme les props ne doivent pas être modifiées et que notre affichage doit évoluer il nous faut un autre outil: les states.

Les états possèdent l'information qui évolue, chaque modification d'un state provoque le rafraichissement du rendu d'un composant.

[Hook d'état](https://fr.reactjs.org/docs/hooks-state.html)

Dans cet exemple avec `useState` nous récupérons un état `count` dont la valeur est initialisée en argument de useState ainsi qu'un setter qu'il faudra utiliserp our mettre à jour l'état.
```js
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>
        Cliquez ici
      </button>
    </div>
  );
}
```

Cette approche est assez nouvelle actuellement et sur les documentations nous pouvons voir d'autres syntaxes avec une programmation qui n'est pas fonctionelle. Pour que la mise à jour du composant ait lieu lors de la modification d'un etat, la référence ne doit pas être la même, pas de mutation!

*src/components/Tasks/TaskList/TaskList.js*

```js
const TaskList = (props) => {

  const [board, setBoard] = useState(props.board);

  const removeTask = (task) => {
    const copy = Object.assign({}, board);
    copy.todo.splice(copy.todo.indexOf(task), 1);
    setBoard(copy);
  };
  
  return (
    <>
      <TaskCount {...props} />
      <ul>
        {board.todo.map((task, index) =>
          <li key={index.toString()} >
            {task.name}
            <button onClick={() => removeTask(task)}>Delete</button>
          </li>
        )}
      </ul>
    </>
  );
}
```

La modification de l'état est prise en compte chez le composant enfant.

*src/components/Tasks/shared/components/TaskCount/TaskCount.js*

```js
const TaskCount = (props) => {

  const [board,] = useState(props.board);

  return (
    <div data-count={board.todo.length}>
      {board.todo.length} Tasks
    </div>
  );
}
```

___

## 📑 Hook

Les Hooks sont arrivés avec React 16.8. Ils vous permettent de bénéficier d’un état local et d’autres fonctionnalités de React sans avoir à écrire une classe.

Nous avons observé un hook d'etat, l'approche des hook permet de faire du réutilisable et d'isoler les états dans ce que l'on peut appeler des hook personnalsiés.

*src/hooks/useNavHook.js*

```js
import { useState } from "react";

const useNavHook = () => {

    const [isBurger, setBurger] = useState(false);
    
    const [currentItem, setCurrentItem] = useState('');

    const toogleBurger = () => setBurger(() => !isBurger);

    const activeItem = (name) => setCurrentItem(() => name);
    
    return [isBurger, toogleBurger, currentItem, activeItem];

};

export default useNavHook;
```

Avec cette approche la déclaration et la modification de l'état est isolée.

```js
const Tasks = () => {

  const [isBurger, toogleBurger, currentItem, activeItem] = useNavHook();

  return (
    <>
      <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="" className="navbar-item">Task App</Link>
          <button className={(isBurger ? 'is-active' : '') + ' navbar-burger'} aria-label="menu" aria-expanded="false"
            onClick={toogleBurger} >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div className={(isBurger ? 'is-active' : '') + ' navbar-menu'}>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="" className={('' === currentItem ? 'is-active' : '') + ' navbar-item'} onClick={() => activeItem('')}>Task List</Link>
                <Link to="create" className={('create' === currentItem ? 'is-active' : '') + ' navbar-item'} onClick={() => activeItem('create')}>Create Task</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <TasksRoutes />
    </>
  );
}
```

[Custom Hook](https://fr.reactjs.org/docs/hooks-overview.html#building-your-own-hooks)

### 🏷️ **Effet**

Le Hook d’effet permet l’exécution d’effets de bord dans les fonctions composants. Quand le composant est monté puis démonter il est possible d'exécuter des instructions.

```js
useEffect(() => {
  console.log('monté');
  return () => {
    console.log("demonté");
  };
});
```

[Performance](https://fr.reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects)

Il est possible de conditionner ce comportement en lui passant l'êtat.

```js
useEffect(() => {
  document.title = `Vous avez cliqué ${count} fois`;
}, [count]); // N’exécute l’effet que si count a changé
```