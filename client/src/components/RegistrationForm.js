import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box } from '@mui/material';
import { registerUser } from '../api/api';

const RegistrationForm = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');


    const validationSchema = Yup.object().shape({
        login: Yup.string()
            .required('Логин обязателен')
            .min(6, 'Логин должен содержать минимум 6 символов')
            .max(20, 'Логин должен содержать максимум 20 символов')
            .matches(/^[a-zA-Z0-9]+$/, 'Логин должен содержать только латинские буквы и цифры'),
        password: Yup.string().required('Пароль обязателен'),
        confirmPassword: Yup.string()
            .required('Повторите пароль')
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
    });

    const handleSubmit = async (values) => {
        const { login, password } = values; // Извлечение из объекта
        try {
          const response = await registerUser(login, password);
          setMessage(response.message);
          setMessageType('success'); // Успешный ответ
      } catch (error) {
          setMessage(error.message);
          setMessageType('error'); // Ошибка
      }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5">Форма регистрации</Typography>
            <Formik
                initialValues={{ login: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur }) => (
                    <Form>
                        <Box sx={{ mb: 2 }}>
                            <Field name="login">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Логин"
                                        variant="outlined"
                                        error={!!(field.touched && field.error)}
                                        helperText={<ErrorMessage name="login" />}
                                        onBlur={handleBlur}
                                    />
                                )}
                            </Field>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Field name="password">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Пароль"
                                        type="password"
                                        variant="outlined"
                                        error={!!(field.touched && field.error)}
                                        helperText={<ErrorMessage name="password" />}
                                        onBlur={handleBlur}
                                    />
                                )}
                            </Field>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Field name="confirmPassword">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Повтор пароля"
                                        type="password"
                                        variant="outlined"
                                        error={!!(field.touched && field.error)}
                                        helperText={<ErrorMessage name="confirmPassword" />}
                                        onBlur={handleBlur}
                                    />
                                )}
                            </Field>
                        </Box>

                        <Button type="submit" variant="contained" color="primary">Зарегистрироваться</Button>
                        {message && (
                            <Typography color={messageType === 'error' ? 'error' : 'success'}>
                                {message}
                            </Typography>
                        )} 
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default RegistrationForm;
