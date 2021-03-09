import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import diagramReducer from './diagram/reducer';
import canvasReducer from './canvas/reducer';

const rootReducer = combineReducers({
  diagram: diagramReducer,
  canvas: canvasReducer,
});

export function configureStore() {
  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
}

export type Store = ReturnType<typeof rootReducer>;

export type ActionShape<S, P> = { type: S; payload: P };
