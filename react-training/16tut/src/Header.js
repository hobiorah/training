import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';

const Header = ({ title, width }) => {
    return (
        <header className="Header">
            <h1>{title}</h1>
            {/* if width less than 768 show mobile alt, if not, execute the next check */}
            {width < 768 ? <FaMobileAlt />
                : width < 992 ? <FaTabletAlt />
                    : <FaLaptop />}
        </header>
    )
}

export default Header