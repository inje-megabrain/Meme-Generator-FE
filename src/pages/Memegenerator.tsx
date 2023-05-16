import { useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useNavigate } from 'react-router-dom';
import { Stage, Layer, Line, Image } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';

const MemeGenerator = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<File | undefined>();
  const [previewimage, setPreviewimage] = useState<string>('');
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState<string>('pen');
  const [lines, setLines] = useState<any>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      setLines([...lines, { tool, color, points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point?.x, point?.y]);
    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleFileOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageSrc(files[0]);
      setPreviewimage(URL.createObjectURL(files[0]));
    }
  };
  const [image] = useImage(previewimage);
  const savebtn = () => {};
  const clearbtn = () => {
    setLines([]);
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
      <div className='mb-4'>
        <select
          className='select select-bordered select-base max-w-xs'
          onChange={(e) => setTool(e.target.value)}
        >
          <option value='pen'>펜</option>
          <option value='eraser'>지우개</option>
        </select>
      </div>
      <div className='grid place-items-center'>
        <Stage
          width={600}
          height={600}
          className='border-2 border-black border-solid'
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            <Image image={image} width={600} height={600} />
            {lines.map((line: any, i: number) => (
              <Line
                key={i}
                points={line.points}
                stroke={color}
                strokeWidth={10}
                tension={0.5}
                lineCap='round'
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
export default MemeGenerator;
