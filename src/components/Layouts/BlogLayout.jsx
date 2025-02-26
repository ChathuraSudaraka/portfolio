import { useEffect } from "react";
import { TracingBeam } from "../ui/tracing-beam";

const BlogLayout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-bgShade dark:bg-black overflow-y-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" />

      {/* Decorative elements */}
      <div className="fixed top-0 right-0 h-[500px] w-[500px] bg-primary/10 rounded-full blur-3xl" />
      <div className="fixed bottom-0 left-0 h-[500px] w-[500px] bg-secondary/10 rounded-full blur-3xl" />

      <TracingBeam>{children}</TracingBeam>
    </div>
  );
};
export default BlogLayout;
