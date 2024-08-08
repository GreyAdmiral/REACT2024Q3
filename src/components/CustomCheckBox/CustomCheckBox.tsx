import { FC, ChangeEvent } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setSelectedMoviesId } from '@store/slices/selectedSlice';
import { getSelectedInfo } from '@tools/getSelectedInfo';
import { MovieProps } from '@typesfolder/types';
import styles from './CustomCheckBox.module.scss';

interface CustomCheckBoxProps {
   movie: MovieProps;
}

export const CustomCheckBox: FC<CustomCheckBoxProps> = ({ movie }) => {
   const selectedMoviesId = useAppSelector((state) => state.selected.selectedMoviesId);
   const dispatch = useAppDispatch();
   const isChecked = selectedMoviesId.some((it) => it.id === movie.kinopoiskId);

   function checkBoxHandler(e: ChangeEvent) {
      e.stopPropagation();
      const newChecked = !selectedMoviesId.some((it) => it.id === movie.kinopoiskId);

      dispatch(setSelectedMoviesId({ isSelected: newChecked, info: getSelectedInfo(movie) }));
   }

   return (
      <label
         id="checkbox"
         title={isChecked ? 'Отменить выбор фильма' : 'Выбрать фильм'}
         className={styles.custom_checkbox}
         onClick={(e) => {
            e.stopPropagation();
         }}
      >
         <input
            type="checkbox"
            name={movie.kinopoiskId}
            id={`${movie.kinopoiskId}-selected`}
            checked={isChecked}
            onChange={checkBoxHandler}
         />
         <span></span>
      </label>
   );
};
