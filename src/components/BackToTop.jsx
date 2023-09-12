import React from "react";
import Arrow from "/assets/up-arrow.svg";
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

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-slate-400">
      <div className="fixed bottom-5 right-0 bg-white rounded-l-full shadow-lg p-1">
        <button
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-900`}
          onClick={scrollToTop}
        >
          <img src={Arrow} alt="Scroll to Top" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default BackToTop;
