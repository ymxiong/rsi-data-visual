import { createSelectorHook, createDispatchHook } from 'react-redux';
import { visualDiagramContext } from './context';

export const useSelector = createSelectorHook(visualDiagramContext);
export const useDispatch = createDispatchHook(visualDiagramContext);
