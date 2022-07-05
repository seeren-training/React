import React from "react";

import './TaskCount.scss';

const TaskCount = (props) => {

  const { count } = props;

  return (
    <section className="hero is-primary mb-4">
      <div className="hero-body">
        <p className="title">
          Task List
        </p>
        <p className="subtitle">
          {!count ? 'There is not tasks' : count + ' Tasks'}
        </p>
      </div>
    </section>
  );
}

export default TaskCount;
