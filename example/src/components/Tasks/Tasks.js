import React, { useState } from "react";

import { Link } from "react-router-dom";

import './Tasks.scss';

import TasksRoutes from "./TasksRoutes";

const Tasks = () => {

  const [activeBurger, setActiveBurger] = useState(false);

  const [activeItem, setActiveItem] = useState('');

  const board = {
    todo: [
      {
        name: 'Bring a coffee',
        description: 'At the morning'
      },
      {
        name: 'Bring chips',
        description: 'At lunch time'
      },
      {
        name: 'Bring fich',
        description: 'At lunch time'
      }
    ],
    doing: [],
    done: []
  };

  return (
    <>
      <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="" className="navbar-item">Task App</Link>
          <button className={(activeBurger ? 'is-active' : '') + ' navbar-burger'} aria-label="menu" aria-expanded="false"
            onClick={() => setActiveBurger((active) => !active)} >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div className={(activeBurger ? 'is-active' : '') + ' navbar-menu'}>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="" className={('' === activeItem ? 'is-active' : '') + ' navbar-item'} onClick={() => setActiveItem(() => '')}>Task List</Link>
                <Link to="create" className={('create' === activeItem ? 'is-active' : '') + ' navbar-item'} onClick={() => setActiveItem(() => 'create')}>Create Task</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <TasksRoutes board={board} />
    </>
  );
}

export default Tasks;
