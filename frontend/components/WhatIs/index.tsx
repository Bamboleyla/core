import { CardForWelcome } from "../CardForWelcome";
import { config } from "./config";

// Компонент секции - Что такое ядро
export const WhatIs = () => {
  return (
    <div
      id="description"
      className="bg-[#EC9E29] text-black p-2 md:p-10 2xl:pt-16"
      data-testid={"WhatIs"}
    >
      <div className="font-[cursive]">
        <p className="text-lg font-semibold md:text-2xl 2xl:text-5xl 2xl:mb-3">
          Что такое Ядро?
        </p>
        <p className="md:text-xl 2xl:text-3xl">
          -это облачное решение, которое позволяет:
        </p>
      </div>

      {config.map((item) => (
        <CardForWelcome key={item.title} {...item} />
      ))}
    </div>
  );
};
