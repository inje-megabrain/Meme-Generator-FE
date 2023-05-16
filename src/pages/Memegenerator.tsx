import CanvasDraw from 'react-canvas-draw';
import { useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useNavigate } from 'react-router-dom';
import { Stage, Layer, Line } from 'react-konva';

const KonvaScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleScriptLoad = () => {
    setIsLoaded(true);
  };

  return (
    <script
      src='https://unpkg.com/konva@9.0.2/konva.min.js'
      onLoad={handleScriptLoad}
      async
    ></script>
  );
};

const MemeGenerator = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<File | undefined>();
  const [color, setColor] = useState('#000000');
  const canvasRef = useRef<CanvasDraw>(null);

  const handleFileOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageSrc(files[0]);
    }
  };

  const savebtn = () => {};
  const clearbtn = () => {
    canvasRef.current?.clear();
  };
  const homebtn = () => {
    navigate('/');
  };
  return (
    <div>
      <button onClick={homebtn} className='btn btn-ghost text-2xl font-bold'>
        ME:ME
      </button>
      <h1>MEME GENERATOR SECTION</h1>
      <input
        type='file'
        className='file-input file-input-ghost file-input-sm max-w-xs mb-2'
        onChange={handleFileOnChange}
        accept='image/jpg, image/jpeg,image/png'
      />
      <div className='grid grid-cols-3 mt-4'>
        <div>
          <HexColorPicker
            color={color}
            onChange={setColor}
            style={{
              height: '150px',
              width: '150px',
            }}
          />
        </div>
        <div>
          <button
            onClick={savebtn}
            className='btn btn-ghost text-base font-bold'
          >
            저장
          </button>
        </div>
        <div>
          <button
            onClick={clearbtn}
            className='btn btn-ghost text-base font-bold'
          >
            지우기
          </button>
        </div>
      </div>
      <div className='grid place-items-center'>
        <CanvasDraw
          ref={canvasRef}
          canvasWidth={500}
          canvasHeight={500}
          brushColor={color}
          brushRadius={5}
          lazyRadius={0}
        />
      </div>
    </div>
  );
};
export default MemeGenerator;
