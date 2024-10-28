import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { fetchServices, fetchMasters, createAppointment,fetchUserAppointments} from '../api';

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
            } catch (error) {
                setMessage(error.message);
                setMessageType('error');
            } finally {
                setLoading(false);
            }
        };
    
        loadServicesAndMasters();
        loadUserAppointments(); 
    }, []);


    const loadUserAppointments = async () => {
        try {
            const appointmentsData = await fetchUserAppointments();
            if (!Array.isArray(appointmentsData)) {
                throw new Error('Полученные данные не являются массивом.');
            }
            setAppointments(appointmentsData);
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
            await createAppointment(selectedService, selectedMaster, appointmentDate);
            setMessage('Запись успешно создана!');
            setMessageType('success');
            loadUserAppointments(); 
        } catch (error) {
            setMessage('Ошибка при создании записи: ' + error.message);
            setMessageType('error');
        } 
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
                    />
                    <Button type="submit" variant="contained" color="primary">Записаться</Button>
                    {message && (
                            <Typography color={messageType === 'error' ? 'error' : 'success'}>
                                {message}
                            </Typography>
                        )} 
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
                            {`Услуга: ${appointment.serviceName}, Мастер: ${appointment.masterName}, Дата: ${new Date(appointment.appointmentDate).toLocaleString()}`}
                        </li>
                    ))}
                </ul>
            )}

        </Container>
    );
};

export default AppointmentPage;
