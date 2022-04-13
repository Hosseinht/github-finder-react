import {createContext, useState, useReducer} from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    // const [users, setUsers] = useState([])
    // const [loading, setLoading] = useState(true)

    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        const {items} = await response.json()

        // we don't need everything it returns we just need items array so we destructure from the object that return
        // and get items
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }
    
    const clearUsers = () => {
      dispatch({
          type: "CLEAR_USERS",
      })
    }

    // We have these functions that dispatch an action to our reducer, our reducer looks at that action,
    // updates the state and then any component that use any part of that state are gonna react to it

    const setLoading = () => dispatch({type: "SET_LOADING"})

    return <GithubContext.Provider value={{
        // users,
        // loading,
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext