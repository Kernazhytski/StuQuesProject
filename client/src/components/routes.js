import AuthPage from "../pages/authPage/AuthPage";
import { LOG_ROUTE, REG_ROUTE } from "../utils/routes";

export const userRotues = [
    {
        path: LOG_ROUTE,
        component: AuthPage
    },
    {
        path: REG_ROUTE,
        component: AuthPage
    }
]