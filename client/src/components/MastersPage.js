import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Snackbar } from '@mui/material';
import { fetchMasters } from '../api';

const MastersPage = () => {
    const [masters, setMasters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const loadMasters = async () => {
            try {
                const data = await fetchMasters();
                setMasters(data);
            } catch (error) {
                setMessage(error.message);
                setMessageType('error');
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        };

        loadMasters();
    }, []);
    
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Наши мастера</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {masters.map(master => (
                        <ListItem key={master.id}>
                            <ListItemText primary={`${master.name} : ${master.speciality}`} secondary={`Опыт: ${master.experience} лет`} />
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

export default MastersPage;
