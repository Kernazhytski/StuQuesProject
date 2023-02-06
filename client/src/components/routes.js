import AuthPage from "../pages/authPage/AuthPage";
import MainPage from "../pages/mainPage/MainPage"
import {LOG_ROUTE, MAIN_ROUTE, REG_ROUTE} from "../utils/routes";

export const userRotues = [
    {
        path: LOG_ROUTE,
        component: AuthPage
    },
    {
        path: REG_ROUTE,
        component: AuthPage
    },
    {
        path: MAIN_ROUTE,
        component: MainPage
    }
]