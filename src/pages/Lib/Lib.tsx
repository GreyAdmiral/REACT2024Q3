import { NavLink } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialState, saveFormInfo } from '@store/slices/formSlice';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { AppRoutes } from '@router/routes';
import { FormType } from '@typefiles/types';
import styles from './Lib.module.scss';
import checkboxStyles from './CustomCheckBox.module.scss';
import { validator } from '@utils/validator';

export const Lib = () => {
   const dispatch = useAppDispatch();
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm<FormType>({
      defaultValues: initialState,
      mode: 'all',
      resolver: yupResolver(validator),
   });

   const submitHandler: SubmitHandler<FormType> = (data) => {
      dispatch(saveFormInfo(data));
   };

   return (
      <section className={styles.page}>
         <div className={styles.pageTitle}>
            <NavLink to={AppRoutes.HOME_ROUTE}>{`<< На главную`}</NavLink>
         </div>

         <form className={styles.pageForm} onSubmit={handleSubmit(submitHandler)}>
            <div className={styles.pageFormBox}>
               <input
                  type="text"
                  {...register('name')}
                  aria-invalid={!(getValues('name').length > 0)}
                  autoComplete="off"
               />
               <label>Имя</label>
               <span className={styles.pageFormError}>{errors.name?.message}</span>
            </div>

            <div className={styles.pageFormBox}>
               <input type="password" {...register('password')} aria-invalid={!(getValues('password').length > 0)} />
               <label>Пароль</label>
               <span className={styles.pageFormError}>{errors.password?.message}</span>
            </div>

            <div className={styles.pageFormBox}>
               <input
                  type="password"
                  {...register('repassword')}
                  aria-invalid={!(getValues('repassword').length > 0)}
               />
               <label>Подтверждение пароля</label>
               <span className={styles.pageFormError}>{errors.repassword?.message}</span>
            </div>

            <div className={styles.pageFormBox}>
               <input
                  type="text"
                  {...register('email')}
                  aria-invalid={!(getValues('email').length > 0)}
                  autoComplete="off"
               />
               <label>Почта</label>
               <span className={styles.pageFormError}>{errors.email?.message}</span>
            </div>

            <div className={styles.pageFormBox}>
               <input type="number" {...register('age')} aria-invalid={!(getValues('age').toString().length > 0)} />
               <label>Возраст</label>
               <span className={styles.pageFormError}>{errors.age?.message}</span>
            </div>

            <div className={styles.pageFormBox}>
               <label htmlFor="sogletting" className={checkboxStyles.customCheckbox}>
                  <input type="checkbox" id="sogletting" {...register('sogletting')} />
                  <span>Принимаю условия соглашения</span>
               </label>
               <span className={styles.pageFormError}>{errors.sogletting?.message}</span>
            </div>

            <button type="submit" className={styles.pageFormSubmit}>
               <span></span>
               <span></span>
               <span></span>
               <span></span>
               Отправить
            </button>
         </form>
      </section>
   );
};
