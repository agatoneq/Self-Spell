import Navbar from './Navbar';
import Footer from './Footer';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;


Layout.propTypes = {
    children: PropTypes.node.isRequired, // 'children' to dowolny element React (tekst, komponenty, JSX, itp.)
  };
  