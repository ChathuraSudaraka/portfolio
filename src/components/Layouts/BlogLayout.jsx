import { useEffect } from "react";
import { TracingBeam } from "../ui/tracing-beam";

const BlogLayout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-bgShade dark:bg-black overflow-y-hidden">
      <TracingBeam>{children}</TracingBeam>
    </div>
  );
};
export default BlogLayout;
