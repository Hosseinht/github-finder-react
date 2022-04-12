import {useEffect, useContext} from "react";
import GithubContext from "../../context/github/GithubContext";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

const UserResults = () => {
    const {users, loading, fetchUser} = useContext(GithubContext)

    useEffect(() => {
        fetchUser()
    }, [])


    if (!loading) {
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
                {users.map((user) => (
                    <h3><UserItem key={user.id} user={user}/></h3>
                ))}
            </div>
        );
    } else {
        return <Spinner/>
    }
};

export default UserResults;

// when we write we want the component loads, so we use  useEffect