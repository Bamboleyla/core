import Image, { StaticImageData } from "next/image";

interface Props {
  img: StaticImageData; //Путь к картинке
  title: string; //Заголовок
  subTitle: string; //Подзаголовок
  description: string; //Описание
}
//Компонент карточки тарифа
export const CardForOurRates = ({
  img,
  title,
  subTitle,
  description,
}: Props) => {
  return (
    <div data-testid={"CardForOurRates"}>
      <Image src={img} alt="imgCard" />
      <div className="text-center font-[cursive] mt-5">
        <p className="text-lg font-semibold md:text-2xl 2xl:text-5xl 2xl:mb-3">
          {title}
        </p>
        <p className="text-xs md:text-sm md:mt-3 2xl:text-xl">{subTitle}</p>
        <p className="text-xs md:text-sm 2xl:text-xl">{description}</p>
      </div>
    </div>
  );
};
