import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Snackbar, TextField, Button } from '@mui/material';
import { fetchServices, addService } from '../api'; // Импортируем функции API

const ServicesPage = () => {
    const [services, setServices] = useState([]); // Список услуг
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [message, setMessage] = useState(''); // Сообщение для Snackbar
    const [messageType, setMessageType] = useState(''); // Тип сообщения
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Открытие Snackbar

    // Состояния для формы добавления услуги
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');

    // Загрузка списка услуг при монтировании компонента
    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchServices();
                setServices(data);
            } catch (error) {
                setMessage(error.message);
                setMessageType('error');
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleServiceAdd = async (e) => {
        e.preventDefault();
        try {
            const newService = await addService(name, time, price);
            setServices((prevServices) => [...prevServices, newService]); // Обновляем список услуг
            setName('');
            setTime('');
            setPrice('');
            setMessage('Услуга добавлена успешно!');
            setMessageType('success');
            setSnackbarOpen(true);
        } catch (error) {
            setMessage(error.message);
            setMessageType('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Услуги</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {services.map(service => (
                        <ListItem key={service.id}>
                            <ListItemText primary={service.name} secondary={`Время: ${service.time} мин, Цена: ${service.price} ₽`} />
                        </ListItem>
                    ))}
                </List>
            )}

            {/* Форма добавления новой услуги */}
            <form onSubmit={handleServiceAdd} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <TextField
                    label="Название услуги"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Время (мин)"
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <TextField
                    label="Цена (₽)"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" style={{ marginTop: '10px' }}>Добавить услугу</Button>
            </form>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={message}
                severity={messageType}
            />
        </Container>
    );
};

export default ServicesPage;

