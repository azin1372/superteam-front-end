import axios from 'axios';
import { addToast } from '@heroui/react';

export const Api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

Api.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        addToast({
            color: "danger",
            title: "Something went wrong",
            description: "Please try again.",
        });

        // Do something with request error
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    function (response) {
        if (response?.data?.message) {
            addToast({
                color: "success",
                // title: "Something went wrong",
                description: response.data.message,
            });
        }
        return response;
    },
    function (error: any) {
        if (error?.response?.status === 401) {
            location.replace('/login');
        } else if (error?.response?.status === 422) {
            let _errors = error.response.data.errors;
            let _msgs = [];

            for (const key in _errors) {
                if (_errors.hasOwnProperty.call(_errors, key)) {
                    let element = _errors[key];

                    _msgs = element.join('<br/>');
                }
            }
            addToast({
                color: "danger",
                // title: "Something went wrong",
                description: _msgs,
            });
        } else if (error?.response?.data?.message && typeof error.response.data.message === 'string') {
            addToast({
                color: "danger",
                // title: "Something went wrong",
                description: error.response.data.message,
            });
        } else if (typeof error?.response?.message === 'string') {
            addToast({
                color: "danger",
                // title: "Something went wrong",
                description: error.response.message,
            });
        } else {
            addToast({
                color: "danger",
                title: "Something went wrong",
                description: "Please try again.",
            });
        }

        return Promise.reject(error);
    }
);

