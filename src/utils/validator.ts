import * as yup from 'yup';

const nameTemplate = /^[A-ZА-Я]{1}[a-z,а-я]*$/;
const passwordTemplate = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;

export const validator = yup.object({
   name: yup.string().required('Введите имя').min(2, 'мин 2 буквы').matches(nameTemplate, 'Первая заглавная'),
   email: yup.string().required('Введите e-mail').email('Неверный формат'),
   password: yup
      .string()
      .required('Введите пароль')
      .matches(passwordTemplate, { message: 'Неверный формат', excludeEmptyString: true }),
   repassword: yup
      .string()
      .required('Подтвердите пароль')
      .oneOf([yup.ref('password'), ''], 'Пароли не совпадают'),
   age: yup.number().required('Введите возраст').positive('Только положительные числа').typeError('Только числа'),
   sogletting: yup.boolean().required('Необходимо согласие!').oneOf([true], 'Необходимо согласие!'),
});
