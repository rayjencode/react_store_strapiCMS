import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import vector from '../assets/croods.png';
import Loading from '../components/Loading';
import { UserContext } from '../context/user';

// Strapi
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';

export default function Login() {
    const history = useHistory();

    const { userLogin, alert, showAlert, user } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('default');
    const [isMember, setIsMember] = useState(true);
    const [loading, setLoading] = useState(false);

    let isEmpty = !email || !password || !username || alert.show;

    const toggleMember = () => {
        setIsMember((prevMember) => {
            let isMember = !prevMember;
            isMember ? setUsername('default') : setUsername('');
            return isMember;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        showAlert({
            msg: 'Accessing the user data. Please wait...',
            time: 5000,
        });

        setLoading(true);
        let response;

        if (isMember) {
            response = await loginUser({ email, password });
        } else {
            response = await registerUser({ email, password, username });
        }

        if (response) {
            const {
                jwt,
                user: { id, username },
            } = response.data;

            setLoading(false);
            userLogin({ id, username, token: jwt });
            showAlert({ msg: `Hello Welcome ${username}` });

            history.push('/products');

            console.log(`Success`, response);
        } else {
            setLoading(false);
            showAlert({
                msg: `Something went wrong! Please try again`,
                type: 'danger',
            });
        }
    };

    useEffect(() => {
        if (user.token) {
            history.push('/');
        }
    }, [history, user.token]);

    return (
        <section className="container-fluid mx-auto">
            <h2 className="text-center my-2 fontRoboto text-uppercase">
                {isMember ? 'Sign in' : 'Register'}
            </h2>

            <div className="form__wrapper d-flex justify-content-between">
                <form className="form__login">
                    {isEmpty && (
                        <p className="form-empty my-2">
                            Enter the required fields
                        </p>
                    )}
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            className="form__login__input"
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Enter your Email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setLoading(false);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            className="form__login__input"
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Enter your Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setLoading(false);
                            }}
                        />
                    </div>

                    {!isMember && (
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                className="form__login__input"
                                type="text"
                                id="username"
                                value={username}
                                placeholder="Enter your Username"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setLoading(false);
                                }}
                            />
                        </div>
                    )}

                    {!isEmpty && (
                        <button
                            type="submit"
                            className="btn btn-block btn-primary"
                            onClick={handleSubmit}
                        >
                            {loading ? (
                                <>
                                    Loading <Loading />
                                </>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    )}

                    <p className="register-link">
                        {isMember ? 'Need to Register' : 'Already a member'}
                        <button type="button" onClick={toggleMember}>
                            click here
                        </button>
                    </p>
                </form>
                <div className="form__login__right">
                    <img src={vector} alt="vector" />
                </div>
            </div>
        </section>
    );
}
