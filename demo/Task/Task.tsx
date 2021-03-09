import React from 'react';
import { ElementView } from 'src/VisualDiagram/logic/element/ElementView';
import ViewMode from './ViewMode';

type TaskProps = {
  element: ElementView;
};

const Task: React.FC<TaskProps> = (props: TaskProps) => {
  return (
    <div onDoubleClick={() => {}}>
      <ViewMode element={props.element} />
    </div>
  );
};

export default Task;
