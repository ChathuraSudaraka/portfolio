import { TracingBeam } from "../ui/tracing-beam";

const BlogLayout = ({ children }) => {
  return (
    <div className="bg-bgShade dark:bg-black overflow-y-hidden">
      <TracingBeam>{children}</TracingBeam>
    </div>
  );
};
export default BlogLayout;
