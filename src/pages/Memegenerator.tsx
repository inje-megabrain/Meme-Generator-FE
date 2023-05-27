import { useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useNavigate } from 'react-router-dom';
import { Stage, Layer, Line, Image, Text, Transformer } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { SlPencil } from 'react-icons/sl';
import { BsEraser } from 'react-icons/bs';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { MemeTypeDataState, PreviewDateState } from '@src/states/atom';
import { toast } from 'react-toastify';

const MemeGenerator = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<File | undefined>();
  const [previewimage, setPreviewimage] =
    useRecoilState<string>(PreviewDateState);
  const setMemetype = useSetRecoilState<string>(MemeTypeDataState);
  const [color, setColor] = useState('#000000');
  const [textcolor, setTextcolor] = useState<string>('#000000');
  const [tool, setTool] = useState<string>('');
  const [lines, setLines] = useState<any>([]);
  const [text, setText] = useState<string>('');
  const [pensize, setPensize] = useState<number>(10);
  const [image] = useImage(previewimage);
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);
  const [boxbtn, setBoxbtn] = useState<string>('drawing');
  const [item, setItem] = useState<string>('top');
  const [textstate, setTextstate] = useState<any>({
    isDragging: false,
    x: 50,
    y: 50,
  });
  const [emoticonstate, setEmoticonstate] = useState<any>({
    isDragging: false,
    x: 50,
    y: 70,
  });
  const [textsize, setTextsize] = useState<number>(30);
  const [textroate, setTextroate] = useState<number>(0);
  const [textstyle, setTextstyle] = useState<string>('normal');
  const [emoticon, setEmoticon] = useState<string>('');

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
  const mobliehandleMouseDown = (e: Konva.KonvaEventObject<TouchEvent>) => {
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
  const mobilehandleMouseMove = (e: Konva.KonvaEventObject<TouchEvent>) => {
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
  const mobilehandleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleFileOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageSrc(files[0]);
      setPreviewimage(URL.createObjectURL(files[0]));
      setMemetype('MEME');
    }
  };
  const textroateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextroate(Number(e.target.value));
  };
  const sharepage = () => {
    const uri = stageRef.current?.toDataURL();
    setPreviewimage(uri!);
    setMemetype('MEME');
    navigate('/share');
  };

  const textChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const textstyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextstyle(e.target.value);
  };

  const clearbtn = () => {
    setLines([]);
  };
  const homebtn = () => {
    navigate('/');
  };
  const templatebtn = () => {
    setPreviewimage('');
    navigate('/template');
  };

  return (
    <div>
      <div>
        <img
          src='src/assets/memelogo.png'
          className='w-12 h-12 inline-block object-cover'
          onClick={homebtn}
        />
      </div>
      <div className='grid place-items-center'>
        <ul className='steps'>
          <li className='step step-primary'>Template</li>
          <li className='step step-primary'>Meme-Generator</li>
          <li className='step'>Save & Share</li>
          <li className='step'>Upload</li>
        </ul>
      </div>
      {!previewimage ? (
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
      ) : null}
      <div className='grid place-items-center'>
        <div className='grid grid-cols-2'>
          <div
            className='btn btn-ghost font-bold text-2xl rounded-xl'
            onClick={templatebtn}
          >
            Previous
          </div>
          {previewimage ? (
            <div
              className='btn btn-ghost font-bold text-2xl rounded-xl'
              onClick={sharepage}
            >
              Next
            </div>
          ) : null}
        </div>
      </div>
      <div className='grid place-items-center mt-4 object-contain'>
        <Stage
          width={320}
          height={320}
          className='border-2 border-black border-solid'
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={mobliehandleMouseDown}
          onTouchMove={mobilehandleMouseMove}
          onTouchEnd={mobilehandleMouseUp}
          ref={stageRef}
        >
          <Layer>
            <Image image={image} width={320} height={320} />
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
          <Layer>
            <Text
              text={text}
              fontSize={textsize}
              fontStyle={textstyle}
              x={textstate.x}
              y={textstate.y}
              draggable
              fill={textcolor}
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
              rotation={textroate}
            />
          </Layer>
          <Layer>
            <Text
              text={emoticon}
              fontSize={40}
              x={emoticonstate.x}
              y={emoticonstate.y}
              draggable
              onDragStart={() => {
                setEmoticonstate({
                  isDragging: true,
                });
              }}
              onDragEnd={(e) => {
                setEmoticonstate({
                  x: e.target.x(),
                  y: e.target.y(),
                  isDragging: false,
                });
              }}
            />
          </Layer>
        </Stage>
      </div>
      <div className='grid place-items-center'>
        <div className='grid grid-rows-2 place-items-center h-[280px]'>
          <div className='grid grid-cols-3 gap-8 h-[130px]'>
            <div
              className='btn btn-ghost text-base font-bold'
              onClick={() => setBoxbtn('decorating')}
            >
              꾸미기
            </div>
            <div
              className='btn btn-ghost text-base font-bold'
              onClick={() => setBoxbtn('picture')}
            >
              텍스트
            </div>
            <div
              className='btn btn-ghost text-base font-bold'
              onClick={() => setBoxbtn('drawing')}
            >
              드로잉
            </div>
          </div>
          <div className='h-[240px]'>
            {boxbtn === 'decorating' ? (
              <div className='grid grid-cols-2'>
                <div className='grid grid-rows-4'>
                  <div
                    className='btn btn-ghost text-font'
                    onClick={() => setItem('top')}
                  >
                    상의
                  </div>
                  <div
                    className='btn btn-ghost text-font'
                    onClick={() => setItem('pants')}
                  >
                    하의
                  </div>
                  <div
                    className='btn btn-ghost text-font'
                    onClick={() => setItem('icon')}
                  >
                    이모티콘
                  </div>
                  <div
                    className='btn btn-ghost text-font'
                    onClick={() => setItem('text')}
                  >
                    말풍선
                  </div>
                </div>
                <div className='grid place-items-center'>
                  {item === 'top' ? (
                    <div>
                      <div className='btn btn-ghost text-red-600 font-bold'>
                        초기화
                      </div>
                      <div className='grid grid-cols-4'>
                        <div className='btn btn-ghost font-bold'>상의1</div>
                        <div className='btn btn-ghost font-bold'>상의2</div>
                        <div className='btn btn-ghost font-bold'>상의3</div>
                        <div className='btn btn-ghost font-bold'>상의4</div>
                      </div>
                    </div>
                  ) : item === 'pants' ? (
                    <div>
                      <div className='btn btn-ghost text-red-600 font-bold'>
                        초기화
                      </div>
                      <div className='grid grid-cols-4'>
                        <div className='btn btn-ghost font-bold'>하의1</div>
                        <div className='btn btn-ghost font-bold'>하의2</div>
                        <div className='btn btn-ghost font-bold'>하의3</div>
                        <div className='btn btn-ghost font-bold'>하의4</div>
                      </div>
                    </div>
                  ) : item === 'icon' ? (
                    <div>
                      <div
                        className='btn btn-ghost text-red-600 font-bold'
                        onClick={() => setEmoticon('')}
                      >
                        초기화
                      </div>
                      <div className='grid grid-cols-4'>
                        <div
                          className='btn btn-ghost font-bold'
                          onClick={() => setEmoticon('👍')}
                        >
                          이모티콘1
                        </div>
                        <div
                          className='btn btn-ghost font-bold'
                          onClick={() => setEmoticon('✌️')}
                        >
                          이모티콘2
                        </div>
                        <div
                          className='btn btn-ghost font-bold'
                          onClick={() => setEmoticon('😝')}
                        >
                          이모티콘3
                        </div>
                        <div
                          className='btn btn-ghost font-bold'
                          onClick={() => setEmoticon('✨')}
                        >
                          이모티콘4
                        </div>
                      </div>
                    </div>
                  ) : item === 'text' ? (
                    <div>
                      <div className='btn btn-ghost text-red-600 font-bold'>
                        초기화
                      </div>
                      <div className='grid grid-cols-4'>
                        <div className='btn btn-ghost font-bold'>말풍선1</div>
                        <div className='btn btn-ghost font-bold'>말풍선2</div>
                        <div className='btn btn-ghost font-bold'>말풍선3</div>
                        <div className='btn btn-ghost font-bold'>말풍선4</div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : boxbtn === 'picture' ? (
              <div>
                <div className='grid gird-rows-3 gap-4 place-items-center'>
                  <div>
                    <HexColorPicker
                      color={textcolor}
                      onChange={setTextcolor}
                      style={{
                        height: '150px',
                        width: '150px',
                      }}
                    />
                  </div>
                  <div className='grid grid-cols-2 place-items-center'>
                    <div>
                      <input
                        type='text'
                        placeholder='TEXT'
                        className='input input-bordered max-w-xs w-28'
                        onChange={textChage}
                      />
                    </div>
                    <div className='w-20'>
                      <div
                        className='btn'
                        onClick={() => {
                          const uri = stageRef.current?.toDataURL();
                          setPreviewimage(uri!);
                          setTextstate({
                            isDrawing: false,
                            x: 10,
                            y: 10,
                          });
                          toast.success(
                            '저장되었습니다! 또 다른 텍스트를 더 입력할 수 있습니다.'
                          );
                        }}
                      >
                        저장
                      </div>
                    </div>
                  </div>
                  <div className='font-bold w-24'>{textsize}px</div>
                  <div className='grid grid-cols-3 gap-1'>
                    <div className='w-12'>
                      <div
                        className='btn btn-ghost text-xs'
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
                        className='btn btn-ghost text-xs'
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
                    <div className='grid place-items-center'>
                      <select onChange={textstyleChange}>
                        <option value='Normal'>Normal</option>
                        <option value='Bold'>Bold</option>
                      </select>
                    </div>
                    <input
                      type='range'
                      min={-180}
                      max={180}
                      onChange={textroateChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className='grid place-items-center'>
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
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemeGenerator;
