import {useState, useContext} from "react";
import {searchUsers} from "../../context/github/GithubActions";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";


const UserSearch = () => {
    const [text, setText] = useState('')
    // When we have a form usually a form input has its own state. component level state

    const {users, dispatch} = useContext(GithubContext)
    // before refactoring
    // const {users, searchUsers, clearUsers} = useContext(GithubContext)
    const {setAlert} = useContext(AlertContext)

    const handleChange = (e) => {
        setText(e.target.value)
    }

    // const handleSubmit = (e) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (text === '') {
            setAlert("Please enter something", "error")
        } else {
            // before refactoring
            // searchUsers(text)
            dispatch({type: 'SET_LOADING'})
            const users = await searchUsers(text)
            dispatch({type: 'GET_USERS', payload: users})
            setText('')
        }
    }
    // searchUser was in GithubContext before, and now it's come from GithubAction
    // before when we just called searchUser in handleSubmit function, but now it
    // returns data, so we need to use async await here and put it in a variable

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-2 gap-8'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input type="text"
                                   className="w-full pr-40 bg-gray-200 input input-lg text-black"
                                   placeholder="Search..."
                                   value={text}
                                   onChange={handleChange}
                            />
                            <button type="submit" className="btn btn-lg absolute top-0 right-0 w-36 rounded-l-none">Go
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {users.length > 0 &&
                <div>
                    {/*<button onClick={clearUsers} className="btn btn-ghost btn-lg">*/}
                    <button onClick={() => dispatch({type: 'CLEAR_USERS'})} className="btn btn-ghost btn-lg">
                        clear
                    </button>
                </div>
            }

        </div>
    );
};

export default UserSearch;
