import Footer from "../components/Portfolio/Footer";
import Navbar from "../components/Portfolio/Navbar";

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
