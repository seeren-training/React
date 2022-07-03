
import { useParams } from 'react-router';

import './Task.scss';

const Task = () => {
  
  let { id } = useParams();

  return (
    <div >
      Task { id }
    </div>

  );
}

export default Task;
