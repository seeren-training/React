export const selectColumns = (store) => store.board.columns;

export const selectFetchStatus = (store) => {
    return store.board.fetch
};

export const selectPutStatus = (store) => {
    return store.board.put
};

export const selectCountTask = (store) => store.board.columns
    && store.board.columns.todo.length
    + store.board.columns.doing.length
    + store.board.columns.done.length;