import React from "react";

import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";

import './TaskList.scss';

import { selectColumns, selectCountTask, selectPutStatus } from "../../../selectors/boardSelectors";
import TaskCount from '../../../layouts/TaskCount/TaskCount';
import { putBoard } from "../../../slices/boardSlice";

const TaskList = () => {

  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
  const count = useSelector(selectCountTask);
  const put = useSelector(selectPutStatus);


  return (
    <>
      <TaskCount count={count} />
      <div className="container">
        {!count ?
          <>
            <h2 className="is-size-2">Start by create a Task! </h2>
            <p className="mt-4">
              <Link to="create" className="button is-link">Create a Task</Link>
              <Link to="random" className="button is-link ml-2">Create a Random Task</Link>
            </p>
          </> :
          <div className="columns">
            {Object.keys(columns).map((name, index) =>
              <ul key={index} className="column has-background-light mr-2 is-size-4">
                <h2 className="has-text-centered mb-4">{name}</h2>
                {columns[name].map((task, index) =>
                  <li key={index.toString()} className={('todo' === name ? 'is-danger' : ('doing' === name ? 'is-info' : 'is-success')) + ' notification'}>
                    <Link to={'' + index} >
                      <h6>{task.name}</h6>
                      <p className="is-size-6">{task.description}</p>
                    </Link>
                    <button className="button is-small mt-2" disabled={put} onClick={() => dispatch(putBoard({...task, delete: true}))}>Delete</button>
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
