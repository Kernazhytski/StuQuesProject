import axios from 'axios';
import { useContext } from 'react';
import {observer} from 'mobx-react-lite'

import { Context } from '../index'

const $api = axios.create({
    //автоматическое добавление куки к каждому запросу
    withCredentials: true,
    baseURL: process.env.REACT_APP_SERVER_URL,
    //headers: {'Content-Type': 'multipart/form-data'}
});

//Перехватывается каждый запрос к серверу и добавляется поле Authorization в headers со значением токена
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config
});

//Перехватывает ответы от сервера с ошибкой и обновляет токен
$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if(error.response.status === 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true
        try {
            const response = await axios(`${process.env.REACT_APP_SERVER_URL}/auth/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest)       
        } catch (error) {
            console.log(error)
        }
    }
    if(error.response.status === 666) {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    }
    throw error
})
export default observer($api)