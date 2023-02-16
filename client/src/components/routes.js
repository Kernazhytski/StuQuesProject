import AuthPage from "../pages/authPage/AuthPage";
import MainPage from "../pages/mainPage/MainPage"
import {AddQuesPage} from "../pages/addQuesPage/AddQuesPage";
import AllUsers from "../pages/allUsersPage/AllUsers";
import MyAnswersPage from "../pages/myAnswersPage/MyAnswersPage";
import MyQuestions from "../pages/myQuestions/MyQuestions";
import QuestionPage from "../pages/questionPage/QuestionPage";

import {ADD_QUES, ALL_USERS, LOG_ROUTE, MAIN_ROUTE, MY_ANSW, MY_QUES, QUES, REG_ROUTE, USER_PAGE} from "../utils/routes";
import UserPage from "../pages/userPage/UserPage";

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
    },
    {
        path: ADD_QUES,
        component: AddQuesPage
    },
    {
        path: ALL_USERS,
        component: AllUsers
    },
    {
        path: MY_ANSW,
        component: MyAnswersPage
    },
    {
        path: MY_QUES,
        component: MyQuestions
    },
    {
        path: QUES,
        component: QuestionPage
    },
    {
        path: USER_PAGE,
        component: UserPage
    }
]