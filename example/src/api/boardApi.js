

export const fetchBoardAPI = async () => {
    return await fetch('https://api.jsonbin.io/v3/b/62c2de75f023111c706291bb', {
        headers: {
            "X-Master-Key": process.env.REACT_APP_API_KEY
        }
    }).then(response => response.json());
}

export const putBoardAPI = async (task, context) => {
    const columns = JSON.parse(JSON.stringify(Object.assign({}, context.getState().board.columns)));
    if (!task.delete) {
        columns.todo = [
            ...columns.todo,
            task
        ];
    } else {
        Object.keys(columns).forEach(key => {
            const item = columns[key].find((item) => item.name === task.name);
            if (null !== item) {
                columns[key].splice(columns[key].indexOf(item), 1);
            }
        });
    }
    return await fetch('https://api.jsonbin.io/v3/b/62c2de75f023111c706291bb', {
        method: 'PUT',
        headers: {
            "X-Master-Key": process.env.REACT_APP_API_KEY,
            "Content-Type": "application/json",
            "X-Bin-Versioning": false
        },
        body: JSON.stringify(columns)
    }).then(response => response.json());
}