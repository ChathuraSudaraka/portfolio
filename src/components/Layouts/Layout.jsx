import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black">
      {/* Main background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" />
      
      {/* Global gradient blobs */}
      <div className="fixed top-0 right-0 h-[500px] w-[500px] bg-primary/10 rounded-full blur-3xl" />
      <div className="fixed bottom-0 left-0 h-[500px] w-[500px] bg-violet-500/10 rounded-full blur-3xl" />
      
      {/* Content wrapper */}
      <div className="relative container max-w-7xl mx-auto">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
