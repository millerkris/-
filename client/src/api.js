const API_BASE_URL = 'http://localhost:3001/api'; 

export const loginUser = async (login, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ login, password }),
    });

    if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.token}; path=/`; // Сохранение токена в cookies
        return data;
    }

    // Обработка ошибок
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Ошибка входа');
};

export const registerUser = async (login, password) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Ошибка регистрации'); 
    }

    return await response.json();
};

export const fetchServices = async () => {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) {
        throw new Error('Ошибка при получении услуг');
    }
    return await response.json();
};

export const fetchMasters = async () => {
    const response = await fetch(`${API_BASE_URL}/masters`);
    if (!response.ok) {
        throw new Error('Ошибка при получении мастеров');
    }
    return await response.json();
};

export const createAppointment = async (serviceId, masterId, appointmentDate,token) => {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`    
        },
        credentials: 'include',
        body: JSON.stringify({ serviceId, masterId, appointmentDate }),
    });

    if (!response.ok) {
        throw new Error('Ошибка при создании записи');
    }

    return await response.json();
};


export const getTokenFromCookies = () => {
    const match = document.cookie.match(/(^|;)\s*token=([^;]+)/);
    return match ? match[2] : null;
};


export const fetchUserAppointments = async () => {
    const token = getTokenFromCookies(); // Получите токен из кук
    const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`    
        },
        credentials: 'include',
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Ошибка при получении записей');
    }

    return await response.json();
};