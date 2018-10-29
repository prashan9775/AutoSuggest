const initial_state = {
    suggestions: [],
};

export default (state = initial_state, action) => {
    let {type, payload} = action;
    if (action) {
        switch (type) {
            case 'suggestions_fetched':
                return {...state, suggestions: payload};
                break;
            case "empty_list":
                return {...state, suggestions: []}; break;
            default:
                return {...state};
                break;
        }
    }
    return initial_state;
};
