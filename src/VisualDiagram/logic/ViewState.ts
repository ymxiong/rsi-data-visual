import ElementState from './element/ElementState';
import LinkState from './link/LinkState';

type ViewState = {
  id: string;
  elements: ElementState[];
  links: LinkState[];
};

const viewStateTemplate: ViewState = {
  id: '',
  elements: [
    {
      id: '1',
      name: 'test1',
      color: '#ff7875',
      x: 100,
      y: 100,
      height: 100,
      width: 100,
      select: false,
    },
    {
      id: '2',
      name: 'test2',
      color: '#ffc53d',
      x: 400,
      y: 100,
      height: 100,
      width: 100,
      select: false,
    },
    {
      id: '3',
      name: 'test3',
      color: '#95de64',
      x: 700,
      y: 100,
      height: 100,
      width: 100,
      select: false,
    },
  ],
  links: [
    {
      id: 'link0',
      name: 'test-link0',
      color: '#95de64',
      points: [],
    },
  ],
};

export { ViewState, viewStateTemplate };
