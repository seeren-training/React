import React from "react";

import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";

import './Tasks.scss';

import TasksRoutes from "./TasksRoutes";
import useNavHook from "../../hooks/useNavHook";
import { selectColumns, selectFetchStatus } from "../../selectors/boardSelectors";
import { fetchBoard } from "../../slices/boardSlice";

const Tasks = () => {

  const dispatch = useDispatch();

  const fetch = useSelector(selectFetchStatus);
  const columns = useSelector(selectColumns);
  const [isBurger, toogleBurger, currentItem, activeItem] = useNavHook();

  if (!columns && !fetch) {
    dispatch(fetchBoard());
  }

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
      {
        !columns && fetch ?
          <progress className="progress is-small is-primary" max="100"></progress> :
          <TasksRoutes />
      }
    </>
  );
}

export default Tasks;
