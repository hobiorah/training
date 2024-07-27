import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ search, setSearch, width }) => {
    return (
        <div className="App">
            <Header title="React JS Blog" width={width} />
            <Nav search={search} setSearch={setSearch} />
            {/* represents all the elemnts that will be included that aren't consistent reardless of whats happeneing */}
            <Outlet /> 
            <Footer />
        </div>
    )
}

export default Layout

//things that are always present?