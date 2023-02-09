import axios from 'axios';



const $api = axios.create({
    //автоматическое добавление куки к каждому запросу
    withCredentials: true,
    baseURL: process.env.REACT_APP_SERVER_URL
});

//Перехватывается каждый запрос к серверу и добавляется поле Authorization в headers со значением токена
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config
});

//
$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if(error.response.status === 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true
        try {
            const response = await axios(`${process.env.REACT_APP_SERVER_URL}/refresh`, {whithCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest)       
        } catch (error) {
            console.log('Не авторизован')
        }
    }
    throw error
})
export default $api