import React from 'react';
import LogicElement from '../../src/VisualLogic/LogicElement';
import ViewMode from './ViewMode';

type TaskProps = {
  component: LogicElement;
};

const Task: React.FC<TaskProps> = (props: TaskProps) => {
  return (
    <div onDoubleClick={() => {}}>
      <ViewMode component={props.component} />
    </div>
  );
};

export default Task;
