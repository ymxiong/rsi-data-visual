import { createSelectorHook, createDispatchHook } from 'react-redux';
import { visualCoreContext } from './context';

export const useSelector = createSelectorHook(visualCoreContext);
export const useDispatch = createDispatchHook(visualCoreContext);
