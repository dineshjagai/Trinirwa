import axios from 'axios';


export const getUserInformation = (username) => {
    const prm = axios({
        method: 'GET',
        url: `/api//${username}`,
    });
    return prm;
};
