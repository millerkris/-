import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Snackbar, TextField, Button } from '@mui/material';

import { fetchMasters } from '../api'; 
import { addMaster } from '../api'; 

const MastersPage = () => {
    const [masters, setMasters] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [message, setMessage] = useState(''); 
    const [messageType, setMessageType] = useState(''); 
    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [name, setName] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [experience, setExperience] = useState('');


    

    // Загрузка списка мастеров при монтировании компонента

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

    const handleMasterAdd = async (e) => {
        e.preventDefault();
        try {
            const newMaster = await addMaster(name, speciality, experience);

            setMasters((prevMasters) => [...prevMasters, newMaster]); 
            setName('');
            setSpeciality('');
            setExperience('');
            setMessage('Мастер добавлен успешно!');
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

            {/* Форма добавления нового мастера */}
            <form onSubmit={handleMasterAdd} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <TextField
                    label="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Специальность"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    required
                />
                <TextField
                    label="Опыт (лет)"
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" style={{ marginTop: '10px' }}>Добавить мастера</Button>
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

export default MastersPage;

