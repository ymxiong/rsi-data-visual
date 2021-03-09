import React from 'react';
import LogicComponent from '../../src/VisualLogic/LogicView/LogicComponent';
import ViewMode from './ViewMode';

type TaskProps = {
  component: LogicComponent;
};

const Task: React.FC<TaskProps> = (props: TaskProps) => {
  return (
    <div onDoubleClick={() => {}}>
      <ViewMode component={props.component} />
    </div>
  );
};

export default Task;
