import { ViewState } from '../../../src/VisualDiagram/logic/ViewState';
import ViewMode from './components/ViewMode';

const componentStyles = {
  model: {
    style: ViewMode,
  },
};

const viewStateTemplate: ViewState = {
  id: 'testView',
  elements: [
    {
      id: '1',
      name: 'test1',
      type: 'model',
      color: '#ff7875',
      x: 400,
      y: 100,
      select: false,
    },
    {
      id: '2',
      name: 'test2',
      type: 'model',
      color: '#ffc53d',
      x: 600,
      y: 100,
      select: false,
    },
    {
      id: '3',
      name: 'test3',
      type: 'model',
      color: '#95de64',
      x: 400,
      y: 400,
      select: false,
    },
  ],
  links: [
    {
      id: 'link0',
      name: 'test-link0',
      color: '#95de64',
      fromElementId: '1',
      toElementId: '2',
      points: [],
    },
    {
      id: 'link1',
      name: 'test-link1',
      color: '#ffc53d',
      fromElementId: '2',
      toElementId: '3',
      points: [],
    },
    {
      id: 'link2',
      name: 'test-link2',
      color: '#ff7875',
      fromElementId: '1',
      toElementId: '3',
      points: [],
    },
  ],
};

export { componentStyles, viewStateTemplate };
