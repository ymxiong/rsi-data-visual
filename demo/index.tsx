import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { VisualToolbarConfig } from 'types';
import VisualDiagram from '../src';
import { randomString } from './test/TEST_SIMPLE_VIEW/utils/RandomUtils';
import {
  canvasConfig,
  viewStateTemplate,
} from './test/TEST_SIMPLE_VIEW/ViewStateTemplate';

const App = () => {
  const visualDiagramRef = useRef<any>(null);

  const visualCanvasConfig = { ...canvasConfig };

  let initX = 100;

  const onCreateModel = () => {
    const type = 'model';
    const id = randomString(6);
    const elementState = {
      id,
      name: `新增${id}`,
      type,
      color: '#4099ff',
      x: (initX += 100),
      y: 100,
      select: false,
    };
    if (visualDiagramRef.current) {
      visualDiagramRef.current.createElement(elementState);
    }
  };

  const toolbarConfig: VisualToolbarConfig = {
    create: {
      id: 'create',
      onClick: onCreateModel,
      icon: 'plus',
      tips: '新增模型',
    },
  };

  visualCanvasConfig.toolbarConfig = toolbarConfig;

  useEffect(() => {
    if (visualDiagramRef.current) {
      visualDiagramRef.current.setView(viewStateTemplate);
      visualDiagramRef.current.selectToolbarItems([
        'create',
        'zoomIn',
        'zoomOut',
        'undo',
        'redo',
        'sort',
        'cut',
      ]);
    }
  }, []);

  const handleChange = (viewState: any) => {
    console.log('onChange', viewState);
  };

  return (
    <div style={{ width: '100%', height: '900px' }}>
      <VisualDiagram
        canvasConfig={visualCanvasConfig}
        ref={visualDiagramRef}
        onChange={handleChange}
      />
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById('root'));
