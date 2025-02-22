import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-bgShade dark:bg-neutral-950">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
