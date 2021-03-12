import ElementState from './element/ElementState';
import LinkState from './link/LinkState';

type ViewState = {
  id: string;
  elements: ElementState[];
  links: LinkState[];
};

const viewStateTemplate: ViewState = {
  id: 'testView',
  elements: [
    {
      id: '1',
      name: 'test1',
      color: '#ff7875',
      x: 400,
      y: 100,
      select: false,
    },
    {
      id: '2',
      name: 'test2',
      color: '#ffc53d',
      x: 600,
      y: 100,
      select: false,
    },
    {
      id: '3',
      name: 'test3',
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
      points: [
        { x: 50, y: 50 },
        {
          x: 50,
          y: 100,
        },
        {
          x: 100,
          y: 120,
        },
        {
          x: 100,
          y: 50,
        },
      ],
    },
    {
      id: 'link1',
      name: 'test-link1',
      color: '#ffc53d',
      fromElementId: '2',
      toElementId: '3',
      points: [
        { x: 50, y: 50 },
        {
          x: 50,
          y: 100,
        },
        {
          x: 100,
          y: 100,
        },
        {
          x: 100,
          y: 50,
        },
      ],
    },
    {
      id: 'link2',
      name: 'test-link2',
      color: '#ff7875',
      fromElementId: '1',
      toElementId: '3',
      points: [
        { x: 50, y: 50 },
        {
          x: 50,
          y: 100,
        },
        {
          x: 100,
          y: 100,
        },
        {
          x: 100,
          y: 50,
        },
      ],
    },
  ],
};

export { ViewState, viewStateTemplate };
