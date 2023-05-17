import { useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useNavigate } from 'react-router-dom';
import { Stage, Layer, Line, Image, Text } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { SlPencil } from 'react-icons/sl';
import { BsEraser } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { PreviewDateState } from '@src/states/atom';

const MemeGenerator = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<File | undefined>();
  const [previewimage, setPreviewimage] =
    useRecoilState<string>(PreviewDateState);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState<string>('');
  const [lines, setLines] = useState<any>([]);
  const [text, setText] = useState<string>('');
  const [pensize, setPensize] = useState<number>(10);
  const [image] = useImage(previewimage);
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);
  const [textstate, setTextstate] = useState<any>({
    isDragging: false,
    x: 50,
    y: 50,
  });
  const [textsize, setTextsize] = useState<number>(30);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      let nlines = null;
      if (tool == 'erase') {
        nlines = lines.filter(
          (line: any) => !(line.points[0] == pos.x && line.points[1] == pos.y)
        );
      } else {
        nlines = [...lines, { tool, color, pensize, points: [pos.x, pos.y] }];
      }
      setLines(nlines);
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
  const sharepage = () => {
    navigate('/share');
    const uri = stageRef.current?.toDataURL();
    setPreviewimage(uri!);
  };
  const textChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const clearbtn = () => {
    setLines([]);
  };
  const homebtn = () => {
    navigate('/');
  };
  const templatebtn = () => {
    navigate('/template');
  };

  return (
    <div>
      <div className='grid place-items-center'>
        <button onClick={homebtn} className='btn btn-ghost text-2xl font-bold'>
          ME:ME
        </button>
      </div>
      <div className='grid place-items-center'>
        <ul className='steps'>
          <li className='step step-primary'>Template</li>
          <li className='step step-primary'>Meme-Generator</li>
          <li className='step'>Save & Share</li>
        </ul>
      </div>
      <div className='grid place-items-center'>
        <div>
          <input
            type='file'
            className='file-input file-input-bordered file-input-black w-full max-w-xs mb-2 rounded-md border-solid'
            onChange={handleFileOnChange}
            accept='image/jpg, image/jpeg,image/png'
          />
        </div>
      </div>
      <div className='grid place-items-center'>
        <div className='grid grid-cols-2'>
          <div
            className='btn btn-ghost font-bold text-2xl rounded-xl'
            onClick={templatebtn}
          >
            Previous
          </div>
          <div
            className='btn btn-ghost font-bold text-2xl rounded-xl'
            onClick={sharepage}
          >
            Next
          </div>
        </div>
      </div>
      <div className='grid place-items-center mt-2'>
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
      </div>
      <div className='grid place-items-center mb-4'>
        <div className='grid grid-cols-3'>
          <div className='grid grid-cols-2'>
            <div>
              <SlPencil
                className='btn btn-ghost text-lg'
                onClick={() => setTool('pen')}
              />
              <div>Pen</div>
            </div>
            <div>
              <BsEraser
                className='btn btn-ghost text-lg'
                onClick={() => setTool('eraser')}
              />
              <div>Eraser</div>
            </div>
          </div>
          <div className='grid grid-cols-4 place-items-center gap-3'>
            <button
              onClick={() => setPensize(5)}
              className='w-[40px] rounded-full bg-white font-bold text-base'
            >
              5
            </button>
            <button
              onClick={() => setPensize(10)}
              className='w-[40px] rounded-full bg-white font-bold text-base'
            >
              10
            </button>
            <button
              onClick={() => setPensize(15)}
              className='w-[40px] rounded-full bg-white font-bold text-base'
            >
              15
            </button>
            <button
              onClick={() => setPensize(20)}
              className='w-[40px] rounded-full bg-white font-bold text-base'
            >
              20
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
      </div>
      <div className='grid place-items-center'>
        <div className='grid gird-cols-1 md:grid-cols-3'>
          <div className='grid place-items-center'>
            <input
              type='text'
              placeholder='TEXT'
              className='input input-bordered max-w-xs'
              onChange={textChage}
            />
          </div>
          <div className='grid place-items-center font-bold'>
            글씨 크기 : {textsize}px
          </div>
          <div className='grid place-items-center'>
            <div
              className='btn mb-2'
              onClick={() => {
                let size = textsize;
                if (textsize < 100) {
                  setTextsize((size += 5));
                } else {
                  setTextsize(100);
                }
              }}
            >
              ▲
            </div>
            <div
              className='btn'
              onClick={() => {
                let size = textsize;
                if (textsize > 1) {
                  setTextsize((size -= 5));
                } else {
                  setTextsize(0);
                }
              }}
            >
              ▼
            </div>
          </div>
        </div>
      </div>
      <div className='grid place-items-center mt-4'>
        <Stage
          width={600}
          height={600}
          className='border-2 border-black border-solid'
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            <Image image={image} width={600} height={600} />
          </Layer>
          <Layer>
            <Text
              text={text}
              fontSize={textsize}
              x={textstate.x}
              y={textstate.y}
              draggable
              fill='black'
              onDragStart={() => {
                setTextstate({
                  isDragging: true,
                });
              }}
              onDragEnd={(e) => {
                setTextstate({
                  x: e.target.x(),
                  y: e.target.y(),
                  isDragging: false,
                });
              }}
            />
          </Layer>
          <Layer>
            {lines.map((line: any, i: number) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.pensize}
                tension={0.5}
                lineCap='round'
                globalCompositeOperation={
                  line.tool === 'pen' ? 'source-over' : 'destination-out'
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
