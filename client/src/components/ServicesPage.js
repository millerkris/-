import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Snackbar } from '@mui/material';
import { fetchServices } from '../api';

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
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
