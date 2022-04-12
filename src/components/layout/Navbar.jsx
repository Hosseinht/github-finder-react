import {FaGithub} from "react-icons/fa";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({title}) => {
    return (
        <div>
            <h1>{title}</h1>
            <FaGithub/>
        </div>
    );
};

Navbar.defaultProps = {
    title: "Github Finder"
}

Navbar.propTypes = {
    title: PropTypes.string
}

export default Navbar;
