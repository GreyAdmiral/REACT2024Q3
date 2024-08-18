import { AppDispatch } from '@typefiles/reduxTypes';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
