import { TracingBeam } from "../components/ui/tracing-beam";

const BlogLayout = ({ children }) => {
  return (
    <div className="bg-bgShade dark:bg-black overflow-y-hidden">
      <TracingBeam className="px-6">{children}</TracingBeam>
    </div>
  );
};
export default BlogLayout;
