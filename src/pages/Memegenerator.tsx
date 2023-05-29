import { useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useNavigate } from 'react-router-dom';
import { Stage, Layer, Line, Image, Text } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { SlPencil } from 'react-icons/sl';
import { BsEraser } from 'react-icons/bs';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  ItemDataState,
  MemeTypeDataState,
  PreviewDateState,
} from '@src/states/atom';
import { toast } from 'react-toastify';
import { ItemsUploadAPI, ItemsDownloadAPI } from '@src/apis/server';
import { ItemType } from '@src/types';
const { VITE_APP_IMAGE_URL } = import.meta.env;

const MemeGenerator = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<File | undefined>();
  const [decorateSrc, setDecorateSrc] = useState<File | undefined>();
  const [previewimage, setPreviewimage] =
    useRecoilState<string>(PreviewDateState);
  const [decorateimage, setDecorateimage] = useState<string>('');
  const setMemetype = useSetRecoilState<string>(MemeTypeDataState);
  const [color, setColor] = useState('#000000');
  const [textcolor, setTextcolor] = useState<string>('#000000');
  const [tool, setTool] = useState<string>('');
  const [lines, setLines] = useState<any>([]);
  const [text, setText] = useState<string>('');
  const [pensize, setPensize] = useState<number>(10);
  const [image] = useImage(previewimage);
  const [decoimage] = useImage(decorateimage);
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
  const [imgstate, setImgstate] = useState<any>({
    isDragging: false,
    x: 50,
    y: 50,
  });
  const [textsize, setTextsize] = useState<number>(30);
  const [textroate, setTextroate] = useState<number>(0);
  const [textstyle, setTextstyle] = useState<string>('normal');
  const [emoticon, setEmoticon] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [decorate, setDecorate] = useState<string>('');
  const [items, setItems] = useRecoilState<ItemType>(ItemDataState);

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
  const DecorateFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setDecorateSrc(files[0]);
      setDecorateimage(URL.createObjectURL(files[0]));
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
  const categoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const decorateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDecorate(e.target.value);
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
  const savebtn = async () => {
    await ItemsUploadAPI(decorateSrc as File, category, decorate);
  };
  useEffect(() => {
    ItemsDownloadAPI(category, setItems);
  }, [category]);

  return (
    <div>
      <div>
        <img
          src='/memelogo.png'
          className='w-12 h-12 inline-block object-cover'
          onClick={homebtn}
        />
      </div>
      <div className='grid place-items-center'>
        <ul className='steps font-sans'>
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
              className='file-input file-input-bordered file-input-black w-full max-w-xs mb-2 rounded-md border-solid font-sans'
              onChange={handleFileOnChange}
              accept='image/jpg,image/jpeg,image/png'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-4 place-items-center'>
            <input
              type='file'
              className='file-input file-input-bordered file-input-black w-full max-w-xs mb-2 rounded-md border-solid font-sans'
              onChange={DecorateFileOnChange}
              accept='image/jpg,image/jpeg,image/png'
            />
            <div>
              <select
                className='select select-bordered w-full max-w-xs'
                onChange={categoryChange}
              >
                <option value='도구'>도구</option>
                <option value='악세서리'>악세서리</option>
                <option value='이모티콘'>이모티콘</option>
                <option value='말풍선'>말풍선</option>
              </select>
            </div>
            <div>
              <input
                type='text'
                placeholder='이름'
                className='input input-bordered w-full max-w-xs'
                onChange={decorateChange}
              />
            </div>
            <div>
              <div className='btn' onClick={savebtn}>
                저장
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className='grid place-items-center'>
        <div className='grid grid-cols-2'>
          <div
            className='btn btn-ghost font-bold text-xl rounded-xl font-sans'
            onClick={templatebtn}
          >
            Previous
          </div>
          {previewimage ? (
            <div
              className='btn btn-ghost font-bold text-xl rounded-xl font-sans'
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
            <Image
              image={decoimage}
              width={50}
              height={50}
              x={imgstate.x}
              y={imgstate.y}
              draggable
              onDragStart={() => {
                setImgstate({
                  isDragging: true,
                });
              }}
              onDragEnd={(e) => {
                setImgstate({
                  x: e.target.x(),
                  y: e.target.y(),
                  isDragging: false,
                });
              }}
            />
          </Layer>
          <Layer>
            <Text
              text={text}
              fontSize={textsize}
              fontStyle={textstyle}
              fontFamily='sans-serif'
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
          <div className='grid grid-cols-3 gap-8 h-[135px]'>
            <div
              className='btn btn-ghost text-lg font-bold font-sans'
              onClick={() => setBoxbtn('decorating')}
            >
              꾸미기
            </div>
            <div
              className='btn btn-ghost text-lg font-sans'
              onClick={() => setBoxbtn('picture')}
            >
              텍스트
            </div>
            <div
              className='btn btn-ghost text-lg font-sans'
              onClick={() => setBoxbtn('drawing')}
            >
              드로잉
            </div>
          </div>
          <div className='h-[240px]'>
            {boxbtn === 'decorating' ? (
              <div className='grid grid-cols-2 place-items-center'>
                <div className='grid grid-rows-4 w-24'>
                  <div
                    className='btn btn-ghost text-base font-sans'
                    onClick={() => setCategory('도구')}
                  >
                    도구
                  </div>
                  <div
                    className='btn btn-ghost text-base font-sans'
                    onClick={() => setCategory('악세서리')}
                  >
                    악세서리
                  </div>
                  <div
                    className='btn btn-ghost text-base font-sans'
                    onClick={() => setCategory('이모티콘')}
                  >
                    이모티콘
                  </div>
                  <div
                    className='btn btn-ghost text-base font-sans'
                    onClick={() => setCategory('말풍선')}
                  >
                    말풍선
                  </div>
                </div>
                <div className='grid place-items-center'>
                  {item === 'top' ? (
                    <div>
                      <div
                        className='btn btn-ghost text-red-600 font-bold text-base font-sans'
                        onClick={() => {
                          setDecorateimage('');
                        }}
                      >
                        초기화
                      </div>
                      {items.map((item, index) => (
                        <div
                          className='btn btn-ghost font-bold text-base font-sans'
                          key={index}
                          onClick={() =>
                            setDecorateimage(
                              VITE_APP_IMAGE_URL + item.imageUrl.toString()
                            )
                          }
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  ) : item === 'pants' ? (
                    <div>
                      <div
                        className='btn btn-ghost text-red-600 font-bold text-base font-sans'
                        onClick={() => {
                          setDecorateimage('');
                        }}
                      >
                        초기화
                      </div>
                      <div className='grid grid-cols-2'>
                        <div className='btn btn-ghost font-bold text-base font-sans'>
                          악세서리1
                        </div>
                        <div className='btn btn-ghost font-bold text-base font-sans'>
                          악세서리2
                        </div>
                        <div className='btn btn-ghost font-bold text-base font-sans'>
                          악세서리3
                        </div>
                        <div className='btn btn-ghost font-bold text-base font-sans'>
                          악세서리4
                        </div>
                      </div>
                    </div>
                  ) : item === 'icon' ? (
                    <div>
                      <div
                        className='btn btn-ghost text-red-600 font-bold text-base font-sans'
                        onClick={() => {
                          setDecorateimage('');
                        }}
                      >
                        초기화
                      </div>
                      <div className='grid grid-cols-2'>
                        <div
                          className='btn btn-ghost font-bold text-base font-sans'
                          onClick={() => setEmoticon('👍')}
                        >
                          이모티콘1
                        </div>
                        <div
                          className='btn btn-ghost font-bold text-base font-sans'
                          onClick={() => setEmoticon('✌️')}
                        >
                          이모티콘2
                        </div>
                        <div
                          className='btn btn-ghost font-bold text-base font-sans'
                          onClick={() => setEmoticon('😝')}
                        >
                          이모티콘3
                        </div>
                        <div
                          className='btn btn-ghost font-bold text-base font-sans'
                          onClick={() => setEmoticon('✨')}
                        >
                          이모티콘4
                        </div>
                      </div>
                    </div>
                  ) : item === 'text' ? (
                    <div>
                      <div
                        className='btn btn-ghost text-red-600 font-bold text-base font-sans'
                        onClick={() => {
                          setDecorateimage('');
                        }}
                      >
                        초기화
                      </div>
                      <div className='grid grid-cols-2'>
                        <div className='btn btn-ghost font-bold text-base font-sans'>
                          말풍선1
                        </div>
                        <div className='btn btn-ghost font-bold text-base font-sans'>
                          말풍선2
                        </div>
                        <div className='btn btn-ghost font-bold text-base font-sans'>
                          말풍선3
                        </div>
                        <div className='btn btn-ghost font-bold text-base font-sans'>
                          말풍선4
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : boxbtn === 'picture' ? (
              <div>
                <div className='grid gird-rows-3 gap-4 place-items-center'>
                  <div className='grid grid-cols-2'>
                    <div>
                      <HexColorPicker
                        color={textcolor}
                        onChange={setTextcolor}
                        style={{
                          height: '100px',
                          width: '100px',
                        }}
                      />
                    </div>
                    <div className='grid grid-rows-2'>
                      <div className='font-bold w-24 font-sans'>
                        {textsize}px
                      </div>
                      <div className='grid place-items-center'>
                        <select
                          onChange={textstyleChange}
                          className='font-sans'
                        >
                          <option value='Normal'>Normal</option>
                          <option value='Bold'>Bold</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 place-items-center'>
                    <div>
                      <input
                        type='text'
                        placeholder='TEXT'
                        className='input input-bordered max-w-xs w-28 font-sans'
                        onChange={textChage}
                      />
                    </div>
                    <div className='w-20'>
                      <div
                        className='btn font-sans'
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
                  <div className='grid grid-cols-2 gap-1 mb-2'>
                    <div className='w-12'>
                      <div className='grid grid-cols-2 gap-2'>
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
                        <div className='font-sans'>Pen</div>
                      </div>
                      <div>
                        <BsEraser
                          className='btn btn-ghost text-lg'
                          onClick={() => setTool('eraser')}
                        />
                        <div className='font-sans'>Eraser</div>
                      </div>
                    </div>
                    <div className='grid grid-cols-4 place-items-center gap-3'>
                      <button
                        onClick={() => setPensize(5)}
                        className='w-[40px] rounded-full bg-white font-bold text-base font-sans'
                      >
                        5
                      </button>
                      <button
                        onClick={() => setPensize(10)}
                        className='w-[40px] rounded-full bg-white font-bold text-base font-sans'
                      >
                        10
                      </button>
                      <button
                        onClick={() => setPensize(15)}
                        className='w-[40px] rounded-full bg-white font-bold text-base font-sans'
                      >
                        15
                      </button>
                      <button
                        onClick={() => setPensize(20)}
                        className='w-[40px] rounded-full bg-white font-bold text-base font-sans'
                      >
                        20
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={clearbtn}
                        className='btn btn-ghost text-lg font-bold  font-sans'
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
