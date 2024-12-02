import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Snackbar
} from '@mui/material';
import { fetchServices, fetchMasters, createAppointment, fetchUserAppointments, getTokenFromCookies } from '../api'; // Импортируем необходимые функции

const AppointmentPage = () => {
    const [services, setServices] = useState([]);     
    const [masters, setMasters] = useState([]);        
    const [appointments, setAppointments] = useState([]); 
    const [selectedService, setSelectedService] = useState(''); 
    const [selectedMaster, setSelectedMaster] = useState('');   
    const [appointmentDate, setAppointmentDate] = useState(''); 
    const [loading, setLoading] = useState(true);              
    const [message, setMessage] = useState('');                
    const [messageType, setMessageType] = useState('');        

    useEffect(() => {
        const loadServicesAndMasters = async () => {
            try {
                const servicesData = await fetchServices();
                const mastersData = await fetchMasters();
                setServices(servicesData);
                setMasters(mastersData);
                await loadUserAppointments(); // Загружаем записи
            } catch (error) {
                setMessage(error.message);
                setMessageType('error');
            } finally {
                setLoading(false);
            }
        };

        loadServicesAndMasters();
    }, []);

    const loadUserAppointments = async () => {
        try {
            const appointmentsData = await fetchUserAppointments();
            if (Array.isArray(appointmentsData)) {
                setAppointments(appointmentsData);  // Сохраняем список записей
            } else {
                throw new Error('Полученные данные не являются массивом.'); // Проверяем, что данные - массив
            }
        } catch (error) {
            setMessage(error.message);
            setMessageType('error');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedService || !selectedMaster || !appointmentDate) {
            setMessage('Пожалуйста, заполните все поля.');
            setMessageType('error');
            return;
        }

        try {
            const token = getTokenFromCookies(); 
            await createAppointment(selectedService, selectedMaster, appointmentDate, token);
            setMessage('Запись успешно создана!');
            setMessageType('success');
            await loadUserAppointments(); // Обновляем список записей
        } catch (error) {
            setMessage('Ошибка при создании записи: ' + error.message);
            setMessageType('error');
        }
    };

    const handleSnackbarClose = () => {
        setMessage(''); // Сбрасываем сообщение
        setMessageType(''); // Сбрасываем тип сообщения
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Запись на услугу</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Выберите услугу</InputLabel>
                        <Select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            label="Выберите услугу"
                        >
                            {services.map(service => (
                                <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Выберите мастера</InputLabel>
                        <Select
                            value={selectedMaster}
                            onChange={(e) => setSelectedMaster(e.target.value)}
                            label="Выберите мастера"
                        >
                            {masters.map(master => (
                                <MenuItem key={master.id} value={master.id}>{master.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        type="datetime-local"
                        fullWidth
                        margin="normal"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">Записаться</Button>
                </form>
            )}
            {/* Список всех записей пользователя */}
            <Typography variant="h5" gutterBottom>Ваши записи</Typography>
            {appointments.length === 0 ? (
                <Typography>Вы пока не записаны на процедуры.</Typography>
            ) : (
                <ul>
                    {appointments.map(appointment => (
                        <li key={appointment.id}>
                            {`Услуга: ${services.find(service => service.id === appointment.serviceId)?.name || 'Неизвестно'}, Мастер: ${masters.find(master => master.id === appointment.masterId)?.name || 'Неизвестно'}, Дата: ${new Date(appointment.appointmentDate).toLocaleString()}`}
                        </li>
                    ))}
                </ul>
            )}
            {/* Snackbar для уведомлений */}
            <Snackbar
                open={Boolean(message)}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={message}
                severity={messageType}
            />
        </Container>
    );
};

export default AppointmentPage;



