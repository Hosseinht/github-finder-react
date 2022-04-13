const githubReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case 'GET_USER':
            return {
                ...state,
                user: action.payload,
                loading: false
            }

        case 'SET_LOADING':
            // whenever we need to set anything in our state we use a reducer
            // so, we're going to have this SET_LOADING that we can then dispatch
            return {
                ...state,
                loading: true
            }
        case "CLEAR_USERS":
            return {
                ...state,
                users:[]
            }
        default:
            return state
    }
}
export default githubReducer