import { CardForWelcome } from "../CardForWelcome";
import { config } from "./config";

// Компонент секции - Благодаря Ядру
export const YouWillBeAble = () => {
  return (
    <div
      id="opportunities"
      className="bg-[#B58FDB] text-black p-2 md:p-10 2xl:pt-16"
      data-testid={"YouWillBeAble"}
    >
      <div className="font-[cursive]">
        <p className="text-lg font-semibold md:text-2xl 2xl:text-5xl 2xl:mb-3">
          Благодаря Ядру,
        </p>
        <p className="md:text-xl 2xl:text-3xl">
          ваш бизнес получает возможности:
        </p>
      </div>

      {config.map((item) => (
        <CardForWelcome key={item.title} {...item} />
      ))}
    </div>
  );
};
