import { AppDispatch } from '@typesfolder/reduxTypes';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
