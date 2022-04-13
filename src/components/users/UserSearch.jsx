import {useState, useContext} from "react";
import GithubContext from "../../context/github/GithubContext";


const UserSearch = () => {
    const [text, setText] = useState('')
    // When we have a form usually a form input has its own state. component level state

    const {users, searchUsers, clearUsers} = useContext(GithubContext)

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text === '') {
            window.alert("Please enter something")
        } else {
            searchUsers(text)
            setText('')
        }
    }

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
                    <button onClick={clearUsers} className="btn btn-ghost btn-lg">
                        clear
                    </button>
                </div>
            }

        </div>
    );
};

export default UserSearch;
