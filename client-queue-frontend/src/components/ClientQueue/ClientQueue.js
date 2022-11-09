import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../constants/statuses";
import { fetchClientsByStatus } from "../../service/check-in-api-service";
import { clientActions } from "../../store/slices/client-slice";
import Client from "../Client/Client";

const ClientQueue = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const clientQueue = useSelector(state => state.clientReducer.clientQueue);
    const clientCallServiceBaseUrl = process.env.REACT_APP_CLIENT_CALL_SERVICE_BASE_URL;
    const v1ClientCallRoot = process.env.REACT_APP_V1_CLIENT_CALL_ROOT;
    const stream = process.env.REACT_APP_STREAM;

    const fetchCalledClients = async () => {
        dispatch(clientActions.initClientQueue(await fetchClientsByStatus('CALLED')));
        setIsLoading(false);
    }

    useEffect(() => {
        fetchCalledClients();
        subscribeToClientStream();
    }, [])

    const subscribeToClientStream = () => {
        const checkInEventSource = new EventSource(clientCallServiceBaseUrl + v1ClientCallRoot + stream,
            { withCredentials: false });

        checkInEventSource.addEventListener(STATUSES.CALLED, event => {
            dispatch(clientActions.addNewClientToQueue(JSON.parse(event.data)));
        });

        checkInEventSource.addEventListener(STATUSES.CLOSED, event => {
            dispatch(clientActions.removeClientFromQueue(JSON.parse(event.data)));
        });

        checkInEventSource.onerror = event => {
            checkInEventSource.close();
        }

        return () => {
            checkInEventSource.close();
        }
    }

    return (
        <div className='container text-center mt-3'>
            <div className='row mb-4'>
                <h1 className='col'>
                    Ticket Number
                </h1>
                <h1 className='col'>
                    Desk
                </h1>
            </div>
            {(!isLoading && clientQueue.length > 0) && clientQueue.map(client => <Client key={client.id} client={client} />)}
        </div>
    );
}

export default ClientQueue;
