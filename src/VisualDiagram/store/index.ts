import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import diagramReducer from './diagram/reducer';
import canvasReducer from './canvas/reducer';

function getReducers() {
  return combineReducers({
    diagram: diagramReducer,
    canvas: canvasReducer,
  });
}

export function configureStore() {
  const rootReducer = getReducers();

  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
}

export type Store = ReturnType<ReturnType<typeof getReducers>>;

export type ActionShape<S, P> = { type: S; payload: P };
