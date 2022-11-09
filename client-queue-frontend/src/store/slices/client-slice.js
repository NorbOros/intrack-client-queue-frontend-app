import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clientQueue: []
};

const initClientQueue = (state, action) => {
    state.clientQueue = action.payload;
}

const addNewClientToQueue = (state, action) => {
    const newClient = action.payload;

    if (!(state.clientQueue.find(cl => cl.id === newClient.id))) {
        state.clientQueue.push(newClient);
    }
}

const removeClientFromQueue = (state, action) => {
    state.clientQueue = state.clientQueue.filter((client) => client.id !== action.payload.id);
}

const clientSlice = createSlice({
    name: 'clientSlice',
    initialState: initialState,
    reducers: {
        initClientQueue,
        addNewClientToQueue,
        removeClientFromQueue
    },
});

export const clientActions = clientSlice.actions;
export default clientSlice;