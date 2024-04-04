import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useToken = () => {
    const [token, setToken] = useState({ token: null });

    useEffect(() => {
        const fetchUserToken = async () => {
            const token = await AsyncStorage.getItem('userToken');
            setToken({ token});
        };

        fetchUserToken();
    }, []);

    return token;
};