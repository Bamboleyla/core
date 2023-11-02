import { StaticImageData } from "next/image";
import Image from "next/image";

interface Props {
  img: StaticImageData; //Изображение для карточки
  title: string; //Заголовок карточки
  description: string[]; //Описание карточки
}

export const CardForWelcome = ({ img, title, description }: Props) => {
  return (
    <div className="flex mt-5" data-testid={"CardForWelcome"}>
      <Image
        className="w-28 h-28 md:w-36 md:h-36 2xl:w-72 2xl:h-72"
        src={img.src}
        alt="imgCard"
        width={520}
        height={520}
      />
      <div className="ml-5 -mt-1 text-xs font-[system-ui] md:w-3/5 lg:w-6/12">
        <p className="font-semibold md:text-xl 2xl:text-4xl">{title}</p>
        {description.map((string, index) => {
          return (
            <p
              key={index}
              className="font-thin text-xs/3 md:text-lg/4 2xl:text-2xl/7"
            >
              {string}
            </p>
          );
        })}
      </div>
    </div>
  );
};
