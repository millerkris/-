import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import MastersPage from './components/MastersPage';
import ServicesPage from './components/ServicesPage';
import AppointmentPage from './components/AppointmentPage';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Салон красоты</Typography>
          <Button color="inherit" component={Link} to="/api/auth/login">Авторизация</Button>
          <Button color="inherit" component={Link} to="/api/users/register">Регистрация</Button>
          <Button color="inherit" component={Link} to="/masters">Мастера</Button>
          <Button color="inherit" component={Link} to="/services">Услуги</Button>
          <Button color="inherit" component={Link} to="/appointments">Запись на услуги</Button>
        </Toolbar>
      </AppBar>

      
      
      <Routes>
        <Route path="/api/auth/login" element={<LoginForm />} />
        <Route path="/api/users/register" element={<RegistrationForm />} />
        <Route path="/masters" element={<MastersPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/appointments" element={<AppointmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
