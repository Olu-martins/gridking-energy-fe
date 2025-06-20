"use client";
import { homePageApi, productsApi } from "../../api";
import ImagePlaceholder from "../../shared/Placeholders/ImagePlaceholder";
import React, { useState } from "react";
import Image from "next/image";

function DownloadPage() {
  const { data: downloadData, isLoading } = productsApi.useGetDownload() as {
    data: {
      downloadWithCategory: any[];
      downloadWithoutCategory: any[];
    };
    isLoading: boolean;
    error: any;
  };

  const { data: ImageId } = homePageApi.useGetCarouselById(
    "67ec910d2d2e858db2b1ca2a"
  ) as {
    data: any;
    isLoading: boolean;
    error: any;
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const filteredCategory = downloadData?.downloadWithCategory.find(
    (item) => item.category._id === selectedCategoryId
  );

  return (
    <div className="w-full min-h-screen">
      <div className="h-0">
      </div>
      <div className="w-full">
        {ImageId?.[0]?.url?.length > 0 ? (
          <div className="relative w-full h-[25.5rem]">
            <Image
              src={ImageId[0].url}
              alt="Banner"
              fill
              style={{ objectFit: "cover" }}
              className="absolute w-full h-full"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ) : (
          <ImagePlaceholder height={"25.5rem"} />
        )}
      </div>

      <div className="w-full flex pl-20 font-bold justify-center text-gray-600 flex-col h-[3.5rem] bg-gray-200 text-center md:text-left">
        {"HOME > DOWNLOADS"}
      </div>

      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 pl-10 pt-5 text-sm space-y-4">
          {downloadData?.downloadWithCategory.map((item) => (
            <button
              key={item.category._id}
              onClick={() => handleCategoryClick(item.category._id)}
              className={`block text-left font-bold text-lg transition  cursor-pointer outline-0 border-0 ${
                selectedCategoryId === item.category._id
                  ? "text-orange-600"
                  : "text-gray-700 hover:text-orange-600"
              }`}
            >
              {item.category.name}
            </button>
          ))}

          {downloadData?.downloadWithoutCategory.length > 0 && (
            <button
              onClick={() => setSelectedCategoryId(null)}
              className={`block text-left font-black text-lg transition cursor-pointer outline-0 border-0 ${
                !selectedCategoryId
                  ? "text-orange-600"
                  : "text-gray-700 hover:text-orange-600"
              }`}
            >
              Gel Battery
            </button>
          )}
        </div>

        <div className="w-full md:w-3/4 px-10 pl-8 py-6 border-l-2">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse space-y-3">
                  <div className="h-20 w-full bg-gray-300 rounded" />
                  <div className="h-20 w-full bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[30rem] w-full">
              {selectedCategoryId
                ? filteredCategory?.products?.map((prod: any) =>
                    prod.downloads.map((file: any) => (
                      <div
                        key={file._id}
                        id={file._id}
                        className="p-4 border my-3 rounded-lg hover:shadow-sm flex w-full justify-between transition-all scroll-mt-20"
                      >
                        <div>
                          <div className="font-semibold text-lg text-orange-600">
                            {file.title}
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            {file.description}
                          </p>
                          <div className="text-sm text-gray-400 mt-1">
                            {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                          </div>
                        </div>
                        <div>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={file.url}
                            download
                            className="mt-2 inline-block font-black text-sm text-white bg-orange-500 px-4 py-3 rounded hover:bg-orange-600"
                          >
                            Download PDF
                          </a>
                        </div>
                      </div>
                    ))
                  )
                : downloadData?.downloadWithoutCategory.map((file) => (
                    <div
                      key={file._id}
                      id={file._id}
                      className="p-4 border rounded-lg hover:shadow-sm flex w-full justify-between transition-all scroll-mt-20"
                    >
                      <div>
                        <div className="font-semibold text-lg text-orange-600">
                          {file.title}
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {file.description}
                        </p>
                        <div className="text-sm text-gray-400 mt-1">
                          {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                        </div>
                      </div>
                      <div>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={file.url}
                          download
                          className="mt-2 inline-block font-black text-sm text-white bg-orange-500 px-4 py-3 rounded hover:bg-orange-600"
                        >
                          Download PDF
                        </a>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DownloadPage;
