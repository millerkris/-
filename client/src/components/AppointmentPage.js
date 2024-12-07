import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main

    useEffect(() => {
        const loadData = async () => {
            try {
                const mastersData = await fetchMasters();
                const servicesData = await fetchServices();
                const userAppointments = await fetchUserAppointments();

                setMasters(mastersData);
<<<<<<< HEAD
                setServices(servicesData);
                setAppointments(userAppointments);
=======
                await loadUserAppointments(); // Загружаем записи
>>>>>>> origin/main
            } catch (error) {
                setMessage(error.message);
                setMessageType('error');
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        };
<<<<<<< HEAD

        loadData();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
=======

        loadServicesAndMasters();
    }, []);
>>>>>>> origin/main

    const handleAppointmentCreate = async (e) => {
        e.preventDefault();
        try {
<<<<<<< HEAD
            const newAppointment = await createAppointment(selectedService, selectedMaster, appointmentDate);
            setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
            setSelectedMaster('');
            setSelectedService('');
            setAppointmentDate('');
            setMessage('Запись создана успешно!');
            setMessageType('success');
            setSnackbarOpen(true);
=======
            const appointmentsData = await fetchUserAppointments();
            if (Array.isArray(appointmentsData)) {
                setAppointments(appointmentsData);  // Сохраняем список записей
            } else {
                throw new Error('Полученные данные не являются массивом.'); // Проверяем, что данные - массив
            }
>>>>>>> origin/main
        } catch (error) {
            setMessage(error.message);
            setMessageType('error');
            setSnackbarOpen(true);
        }
    };

<<<<<<< HEAD
    const handleDeleteAppointment = async (id) => {
        try {
            await deleteAppointment(id);
            setAppointments((prevAppointments) => prevAppointments.filter(appointment => appointment.id !== id));
            setMessage('Запись удалена успешно!');
            setMessageType('success');
            setSnackbarOpen(true);
=======
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
>>>>>>> origin/main
        } catch (error) {
            setMessage(error.message);
            setMessageType('error');
<<<<<<< HEAD
            setSnackbarOpen(true);
        }
    };

=======
        }
    };

    const handleSnackbarClose = () => {
        setMessage(''); // Сбрасываем сообщение
        setMessageType(''); // Сбрасываем тип сообщения
    };

>>>>>>> origin/main
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Записаться на услугу</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
<<<<<<< HEAD
                <>
                    {/* Форма создания новой записи */}
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

                    {/* Список записей пользователя */}
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
=======
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
>>>>>>> origin/main
        </Container>
    );
};

export default AppointmentPage;



