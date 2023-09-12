import useThemeSwitcher from "./hooks/useThemeSwitcher";
import Moon from "/assets/moon.svg";
import Sun from "/assets/sun.svg";
import imageCompression from "browser-image-compression";

async function handleImageUpload(event) {
  const imageFile = event.target.files[0];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(compressedFile.size / 1024 / 1024);
  } catch (error) {
    console.log(error);
  }
}

const DarkLight = () => {
  const [mode, setMode] = useThemeSwitcher();
  return (
    <div className="bg-slate-400 transition-all duration-500">
      <div className="fixed top-28 right-0 dura bg-white rounded-l-full shadow-lg p-1">
        <button
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
            mode === "dark" ? "border-gray-600" : "border-yellow-500"
          } hover:bg-opacity-50 hover:duration-200`}
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          {mode === "dark" ? (
            <img src={Sun} alt="Light Mode" className="w-8 h-8" />
          ) : (
            <img src={Moon} alt="Dark Mode" className="w-8 h-8" />
          )}
        </button>
      </div>
    </div>
  );
};

export default DarkLight;
