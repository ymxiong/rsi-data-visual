import React from 'react';
import Component from '../../src/entity/Component';
import ViewMode from './ViewMode';

type TaskProps = {
  component: Component;
};

const Task: React.FC<TaskProps> = (props: TaskProps) => {
  return (
    <div onDoubleClick={() => {}}>
      <ViewMode component={props.component} />
    </div>
  );
};

export default Task;
