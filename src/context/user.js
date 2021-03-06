import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const getUserLS = () => {
    return localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : { username: null, token: null };
};

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(getUserLS());
    const [alert, setAlert] = useState({
        show: false,
        msg: '',
        type: 'danger',
    });

    const [height, setHeight] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setHeight(window.pageYOffset);
        });
        return () => {
            window.removeEventListener('scroll', () => {});
        };
    }, [setHeight, height]);

    const showAlert = ({ msg, type = 'success', time = 4000 }) => {
        setAlert({ show: true, msg, type });
        setTimeout(() => {
            setAlert({ ...alert, show: false });
        }, time);
    };

    const hideAlert = () => {
        setAlert({ ...alert, show: false });
    };

    const userLogin = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const userLogout = () => {
        setUser({ username: null, token: null });
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider
            value={{
                userLogin,
                user,
                userLogout,
                showAlert,
                hideAlert,
                alert,
                height,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
