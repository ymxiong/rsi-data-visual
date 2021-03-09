import ElementView from './element/ElementView';
import LinkView from './link/LinkView';

type View = {
  id: string;
  elements: ElementView[];
  links: LinkView[];
};

const viewTemplate = (): View => {
  return {
    id: '',
    elements: [
      {
        id: '1',
        state: {
          id: '1',
          name: 'test1',
          color: '#ff7875',
          x: 100,
          y: 100,
          height: 100,
          width: 100,
        },
      },
      {
        id: '2',
        state: {
          id: '2',
          name: 'test2',
          color: '#ffc53d',
          x: 400,
          y: 100,
          height: 100,
          width: 100,
        },
      },
      {
        id: '3',
        state: {
          id: '3',
          name: 'test3',
          color: '#95de64',
          x: 700,
          y: 100,
          height: 100,
          width: 100,
        },
      },
    ],
    links: [
      {
        id: 'link0',
        state: {
          id: 'link0',
          name: 'test-link0',
          color: '#95de64',
          points: [],
        },
      },
    ],
  };
};

export { View, viewTemplate };
