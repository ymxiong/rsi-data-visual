import React from 'react';
import ElementLogic from '../../src/VisualLogic/ElementLogic';
import ViewMode from './ViewMode';

type TaskProps = {
  component: ElementLogic;
};

const Task: React.FC<TaskProps> = (props: TaskProps) => {
  return (
    <div onDoubleClick={() => {}}>
      <ViewMode component={props.component} />
    </div>
  );
};

export default Task;
