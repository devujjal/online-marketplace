import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root/Root";
import HomePage from "../pages/HomePage/HomePage";
import PrivateRoute from "./PrivateRoute";
import JobDetails from "../components/JobDetails/JobDetails";
import AddJob from "../pages/AddJob/AddJob";
import LogInPage from "../pages/LogInPage/LogInPage";
import SIgnUpPage from "../pages/SignUpPage/SIgnUpPage";
import MyPostedJob from "../pages/MyPostedJob/MyPostedJob";
import JobUpdate from "../pages/JobUpdate/JobUpdate";
import MyBids from "../pages/MyBids/MyBids";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/job/:id',
                element: <PrivateRoute><JobDetails /></PrivateRoute>
            },
            {
                path: 'add-job',
                element: <PrivateRoute><AddJob /></PrivateRoute>
            },
            {
                path: 'my-posted-job',
                element: <PrivateRoute><MyPostedJob /></PrivateRoute>
            },
            {
                path: '/update/:id',
                element: <PrivateRoute><JobUpdate /></PrivateRoute>
            },
            {
                path: 'my-bids',
                element: <PrivateRoute><MyBids /></PrivateRoute>
            },
            {
                path: 'sign-in',
                element: <LogInPage />
            },
            {
                path: 'sign-up',
                element: <SIgnUpPage />
            }
        ]

    }
])

export default routes;