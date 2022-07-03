import React, { useState } from "react";

import { Link } from "react-router-dom";

import TaskCount from "../shared/components/TaskCount/TaskCount";

import './TaskList.scss';

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
      <div className="container">
        {!board.todo.length && !board.doing.length && !board.done.length ?
          <>
            <h2 className="is-size-2">Start by create a Task!</h2>
            <p className="mt-4">
              <Link to="create" className="button is-link">Create a Task</Link>
              <Link to="random" className="button is-link ml-2">Create a Random Task</Link>
            </p>
          </> :
          <div className="columns">
            {Object.keys(board).map((name, index) =>
              <ul key={index} className="column has-background-light mr-2 is-size-4">
                <h2 className="has-text-centered mb-4">{name}</h2>
                {board[name].map((task, index) =>
                  <li key={index.toString()} className={('todo' === name ? 'is-danger' : ('doing' === name ? 'is-info' : 'is-success')) + ' notification'}>
                    <Link to={'' + index} >
                      <h6>{task.name}</h6>
                      <p className="is-size-6">{task.description}</p>
                    </Link>
                    <button className="button is-small mt-2" onClick={() => removeTask(task)}>Delete</button>
                  </li>

                )}
              </ul>
            )}
          </div>
        }
      </div>
    </>
  );
}

export default TaskList;
