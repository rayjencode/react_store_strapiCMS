import axios from 'axios';
import URL from '../utils/URL';

const registerUser = async ({ email, password, username }) => {
    const response = await axios
        .post(`${URL}/auth/local/register`, {
            email,
            password,
            username,
        })
        .catch((error) => console.log(error));
    return response;
};

export default registerUser;
