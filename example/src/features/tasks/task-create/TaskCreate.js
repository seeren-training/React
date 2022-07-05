import { useSelector } from 'react-redux';

import './TaskCreate.scss';

import useTaskFormHook from '../../../hooks/useTaskFormHook';
import { selectPutStatus } from '../../../selectors/boardSelectors';

const TaskCreate = () => {

  const put = useSelector(selectPutStatus);
  const [name, description, errorName, errorDescription, validateName, validateDescription, createTask] = useTaskFormHook();

  return (
    <section className="hero is-fullheight-with-navbar is-dark">
      <div className="hero-body">
        <div className="column is-full">
          <p className="title mb-6">
            New Task
          </p>
          <div className="subtitle columns">
            <form className="column is-two-thirds" onSubmit={createTask}>
              <div className="field">
                <label htmlFor="name" className='label has-text-white'>Name</label>
                {errorName && <div className="notification is-danger">{errorName}</div>}
                <div className="control">
                  <input id="name" className='input' placeholder='Task Name' value={name} onChange={(e) => validateName(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="description" className='label has-text-white'>Description</label>
                {errorDescription && <div className="notification is-danger">{errorDescription}</div>}
                <div className="control">
                  <input id="description" className='input' placeholder='Task Description' value={description} onChange={(e) => validateDescription(e.target.value)} />
                </div>
              </div>
              <div className="field mt-4">
                <div className="control">
                  <button className='button is-link' disabled={put}>Create</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section >
  );
}

export default TaskCreate;
