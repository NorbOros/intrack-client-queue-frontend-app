import axios from 'axios';

const clientCallServiceBaseUrl = process.env.REACT_APP_CLIENT_CALL_SERVICE_BASE_URL;
const v1ClientCallRoot = process.env.REACT_APP_V1_CLIENT_CALL_ROOT;

export const fetchClientsByStatus = async status => {
    return await axios.get(clientCallServiceBaseUrl + v1ClientCallRoot + '/' + status)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
};
