# Communication

*  🔖 **Redux**
*  🔖 **Slice**
*  🔖 **Store**
*  🔖 **HTTP**
*  🔖 **Utilisation**

___

## 📑 Redux

Il y a 3 librairies à identifier qui forment un écosystème.

* Redux: gestion des états
* React-Redux: transmission des états aux composants
* Redux Thunk: gestion de l'asynchronisme

L'ensemble est disponible dans le redux-toolkit.

```bash
npm i @reduxjs/toolkit
```

[Redux Toolkit](https://redux-toolkit.js.org/)

___

## 📑 Slice

Nous voulons centraliser l'état de nos composants et centraliser les actions. Une fonction qui modifie l'état pour une action est un reducer. Un slice permet à partir d'un état initial de coupler action et reducer.

```js
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = { value: 0 };

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

Cet exemple montre que pour le nom 'counter' il y a 3 actions qui modifient un état, si la mutation est acceptéé c'est parce que le state reçu en argument est un proxy. Les arguments reçu par une action sont dans la propriété payload.

La création déclare donc un état et associe des actions le tout centralisé!

[Slice](https://redux-toolkit.js.org/api/createSlice)

### 🏷️ **Selector**

Pour permettre au composant d'obtenir une information il est possible de fournir un selector. Il sera utilisé dans le dernier exemple de ce chapitre

```js
export const selectCount = (state) => state.counter.value;
```

___

## 📑 Store

Pour que le slice soit pris en compte avec son état et ses actions et qu'il provoque un rendu des composants il faut l'intégrer dans un store.

```js
import { configureStore } from '@reduxjs/toolkit'

import { counterSlice } from '../slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
    }
});
```

L'ensemble des composants devront être wrapés dans un provider.

```js
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
```

Le store est configuré et les composants peuvent utiliser l'état et les actions du slice.

[Store](https://redux-toolkit.js.org/api/configureStore#usage)

___

## 📑 HTTP

Pour gérer l'asynchronisme il est possible de dispatcher l'état en créant des états intermédiaires via des middlewares, mais le toolkit propose une solution.

Quand une fonction est asynchrone comme la suivante.

```js
// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
```

Le principe est de créer une action qui est qualifiée d'asynchrone. Elle doit renvoyer ce qui qualifiera la payload d'un prochain callback.

```js
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
```

Cette action particulière n'est pas à intégrer dans la propriété `reducers` de notre slice mais dans `extraReducers`.

```js
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});
```

De cette façon son exécution permet d'avoir les informations de traitement dans la payload de l'action.

[Async Thunk](https://redux-toolkit.js.org/api/createAsyncThunk)

___

## 📑 Utilisation

Il ne reste plus qu'au composant d'afficher l'état et de proposer des évènements sur les actions.

```js
xport function Counter() {

  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}>
        </button>
        <span className={styles.value}>{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}>
          +
        </button>
        <button onClick={() => dispatch(incrementAsync(incrementValue))}>
          Add Async
        </button>
      </div>
    </div>
  );
}

```

L'on remarque l'utilisation du selector ainsi que de `dispatch` pour exécuter les actions.