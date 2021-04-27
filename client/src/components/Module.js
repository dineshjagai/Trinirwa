import axios from 'axios';


export const getPlayersInfo = (username) => {
    const prm = axios({
        method: 'GET',
        url: `/api/playerInfo/${username}`,
    });
    return prm;
};
