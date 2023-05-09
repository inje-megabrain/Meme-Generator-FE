import CanvasDraw from "react-canvas-draw";
import { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";

const MemeGenerator = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<File | undefined>();
  const [color, setColor] = useState("#000000");
  const canvasRef = useRef<CanvasDraw>(null);

  const handleFileOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageSrc(files[0]);
    }
  };

  const savebtn = () => {
    const data = canvasRef.current?.getDataURL();
    if (data) {
      const a = document.createElement("a");
      a.href = data;
      a.download = "image.png";
      a.click();
    }
  };
  const clearbtn = () => {
    canvasRef.current?.clear();
  };
  const homebtn = () => {
    navigate("/");
  };
  return (
    <div>
      <button onClick={homebtn} className="btn btn-ghost text-2xl font-bold">
        NyangPiece
      </button>
      <h1>MEME GENERATOR SECTION</h1>
      <input
        type="file"
        className="file-input file-input-ghost file-input-sm max-w-xs mb-2"
        onChange={handleFileOnChange}
        accept="image/jpg, image/jpeg,image/png"
      />
      <div className="grid grid-cols-3 mt-4">
        <div>
          <HexColorPicker
            color={color}
            onChange={setColor}
            style={{
              height: "150px",
              width: "150px",
            }}
          />
        </div>
        <div>
          <button
            onClick={savebtn}
            className="btn btn-ghost text-base font-bold"
          >
            저장
          </button>
        </div>
        <div>
          <button
            onClick={clearbtn}
            className="btn btn-ghost text-base font-bold"
          >
            지우기
          </button>
        </div>
      </div>
      <div className="grid place-items-center">
        <CanvasDraw
          ref={canvasRef}
          hideGrid={false}
          hideInterface={false}
          lazyRadius={0}
          brushColor={color}
          style={{
            boxShadow:
              "0 13px 27px -5px rgba(50,50,93,0.5), 0 8px 16px -8px rgba(0,0,0,0.2)",
            backgroundImage: imageSrc
              ? `url(${URL.createObjectURL(imageSrc)})`
              : "",
            backgroundSize: "cover",
            width: "800px",
            height: "600px",
          }}
        />
      </div>
    </div>
  );
};
export default MemeGenerator;
