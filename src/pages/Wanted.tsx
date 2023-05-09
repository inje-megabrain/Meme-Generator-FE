import React, { useEffect, useState } from "react";
import { imageDownloadAPI } from "../apis/server";
import { useRecoilState } from "recoil";
import { WantedDataState } from "../states/atom";
import { WantedType } from "../types";

const Wanted = () => {
  const { VITE_APP_IMAGE_URL } = import.meta.env;
  const [wantedList, setWantedList] =
    useRecoilState<WantedType>(WantedDataState);
  const [page, setPage] = useState<number>(0);
  const prevpage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const nextpage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    imageDownloadAPI(page, setWantedList);
  }, [page]);
  return (
    <div>
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {wantedList.map((wanted, index) => (
            <div key={index}>
              <div className="relative inline-block">
                <img src="public/wanted.png" />
                <div className="absolute left-8 top-28">
                  <div className="inline-block">
                    <img
                      src={VITE_APP_IMAGE_URL + wanted.imageUrl.toString()}
                      className="w-72 h-[266px] object-cover"
                    />
                  </div>
                </div>
                <div className="absolute left-12 bottom-24">
                  <div className="inline-block">
                    <div className="font-bold text-xl">
                      수배명 : {wanted.name}
                    </div>
                    <div className="font-bold text-base">
                      특이사항 : {wanted.description}
                    </div>
                  </div>
                </div>
                <div className="absolute left-20 bottom-14">
                  <div className="inline-block">
                    <div className="font-bold text-xl">
                      {wanted.prize}Cherry
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <div className="btn-group">
            <button className="btn btn-ghost" onClick={prevpage}>
              {"<<"}
            </button>
            <button className="btn btn-ghost">Page {page + 1}</button>
            <button className="btn btn-ghost" onClick={nextpage}>
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Wanted;
