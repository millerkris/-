import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Snackbar,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@mui/material';
import { fetchMasters, fetchServices, createAppointment, fetchUserAppointments, deleteAppointment } from '../api'; 

const AppointmentPage = () => {
    const [masters, setMasters] = useState([]);
    const [services, setServices] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [selectedMaster, setSelectedMaster] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const mastersData = await fetchMasters();
                const servicesData = await fetchServices();
                const userAppointments = await fetchUserAppointments();

                setMasters(mastersData);
                setServices(servicesData);
                setAppointments(userAppointments);
            } catch (error) {
                setMessage(error.message);
                setMessageType('error');
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleAppointmentCreate = async (e) => {
        e.preventDefault();
        try {
            const newAppointment = await createAppointment(selectedService, selectedMaster, appointmentDate);
            setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
            setSelectedMaster('');
            setSelectedService('');
            setAppointmentDate('');
            setMessage('Запись создана успешно!');
            setMessageType('success');
            setSnackbarOpen(true);
        } catch (error) {
            setMessage(error.message);
            setMessageType('error');
            setSnackbarOpen(true);
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            await deleteAppointment(id);
            setAppointments((prevAppointments) => prevAppointments.filter(appointment => appointment.id !== id));
            setMessage('Запись удалена успешно!');
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
            <Typography variant="h4" gutterBottom>Записаться на услугу</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <form onSubmit={handleAppointmentCreate} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                        <FormControl required>
                            <InputLabel id="master-select-label">Мастер</InputLabel>
                            <Select
                                labelId="master-select-label"
                                value={selectedMaster}
                                onChange={(e) => setSelectedMaster(e.target.value)}
                            >
                                {masters.length > 0 ? (
                                    masters.map(master => (
                                        <MenuItem key={master.id} value={master.id}>{master.name}</MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No masters available</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl required>
                            <InputLabel id="service-select-label">Услуга</InputLabel>
                            <Select
                                labelId="service-select-label"
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                            >
                                {services.length > 0 ? (
                                    services.map(service => (
                                        <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No services available</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Дата и время записи"
                            type="datetime-local"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" style={{ marginTop: '10px' }}>Создать запись</Button>
                    </form>

                    <List>
                        {appointments.map(appointment => (
                            <ListItem key={appointment.id}>
                                <ListItemText
                                    primary={`Услуга: ${services.find(service => service.id === appointment.serviceId)?.name || 'Неизвестно'}, Мастер: ${masters.find(master => master.id === appointment.masterId)?.name || 'Неизвестно'}, Дата: ${new Date(appointment.appointmentDate).toLocaleString()}`}
                                />
                                <Button onClick={() => handleDeleteAppointment(appointment.id)} color="secondary">Удалить</Button>
                            </ListItem>
                        ))}
                    </List>

                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                        message={message}
                        severity={messageType}
                    />
                </>
            )}
        </Container>
    );
};

export default AppointmentPage;




        
