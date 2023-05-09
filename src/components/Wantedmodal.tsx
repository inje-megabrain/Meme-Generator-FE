import React, { useState } from "react";
import { imageUploadApi } from "../apis/server";
import { useNavigate } from "react-router-dom";

interface props {
  modalnumber: string;
}

const Wantedmodal = (props: props) => {
  const { modalnumber } = props;
  const [imageSrc, setImageSrc] = useState<File | undefined>();
  const [previewimage, setPreviewimage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [money, setMoney] = useState<number>(0);
  const [detail, setDetail] = useState<string>("");
  const navigate = useNavigate();

  const handleFileOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageSrc(files[0]);
      setPreviewimage(URL.createObjectURL(files[0]));
    }
  };
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const moneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(Number(e.target.value));
  };
  const detailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetail(e.target.value);
  };
  const imageuploadbtn = async () => {
    await imageUploadApi(imageSrc as File, name, detail, money);
    window.location.reload();
    setImageSrc(undefined);
    setPreviewimage("");
    setName("");
    setMoney(0);
    setDetail("");
    navigate("/");
  };

  return (
    <div>
      <input type="checkbox" id={modalnumber} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor={modalnumber}
            className="btn btn-sm btn-circle absolute top-2 right-2 mt-2"
          >
            X
          </label>
          <div>
            <input
              type="file"
              className="file-input file-input-ghost file-input-sm max-w-xs mb-2"
              onChange={handleFileOnChange}
              accept="image/jpg, image/jpeg,image/png"
            />
            <div className="relative inline-block">
              <img src="public/wanted.png" />
              <div className="absolute left-8 top-28">
                <div className="inline-block">
                  {previewimage && (
                    <img
                      src={previewimage.toString()}
                      className="w-72 h-[266px] object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="absolute left-12 bottom-24">
                <div className="inline-block">
                  <div className="grid grid-cols-2">
                    <div>
                      <div className="font-bold text-xl">수배명 : </div>
                      <div className="font-bold text-base">특이사항 :</div>
                    </div>
                    <div>
                      <div className="font-bold text-xl">{name}</div>
                      <div className="font-bold text-base">{detail}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-20 bottom-14">
                <div className="inline-block">
                  <div className="font-bold text-xl">{money}Cherry</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
            <div className="grid grid-rows-3 gap-3 col-span-2">
              <input
                type="text"
                placeholder="수배명"
                className="input input-bordered max-w-xs"
                maxLength={6}
                onChange={nameChange}
              />
              <input
                type="text"
                placeholder="특이사항 (목격장소, 특징 등)"
                className="input input-bordered max-w-xs"
                onChange={detailChange}
                maxLength={14}
              />
              <input
                type="text"
                placeholder="현상금"
                className="input input-bordered max-w-xs"
                onChange={moneyChange}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                className="btn btn-ghost text-base font-bold outline"
                onClick={imageuploadbtn}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Wantedmodal;
