import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

import { fetchBoardAPI, putBoardAPI } from '../api/boardApi';

const initialState = {
    columns: null,
    fetch: false,
    put: false
};

export const fetchBoard = createAsyncThunk('board/fetchBoard', fetchBoardAPI);

export const putBoard = createAsyncThunk('board/putBoard', putBoardAPI);

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        removeTask: (state, action) => {
            Object.keys(current(state.columns)).forEach(key => {
                const taskIndex = current(state.columns[key]).indexOf(action.payload);
                if (-1 !== taskIndex) {
                    state.columns[key].splice(taskIndex, 1);
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBoard.pending, (state) => {
            state.fetch = true;
        })
        builder.addCase(fetchBoard.fulfilled, (state, action) => {
            state.fetch = false;
            state.columns = action.payload.record;
        })
        builder.addCase(putBoard.pending, (state) => {
            state.put = true;
        })
        builder.addCase(putBoard.fulfilled, (state, action) => {
            state.put = false;
            state.columns = action.payload.record;
        })
    }
});

export const { removeTask } = boardSlice.actions;