import useThemeSwitcher from "./hooks/useThemeSwitcher";
import Moon from "/assets/moon.png";
import Sun from "/assets/sun.png";

const DarkLight = () => {
  const [mode, setMode] = useThemeSwitcher();
  return (
    <div className="bg-slate-400">
      <div className="fixed top-28 right-0  bg-white rounded-l-full shadow-lg p-1">
        <button
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
            mode === "dark" ? "border-gray-600" : "border-yellow-500"
          }`}
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
