import Image, { StaticImageData } from "next/image";

interface Props {
  img: StaticImageData; //Изображение карты
  title: string; //Заголовок
}

// Компонент карточки секции - Для кого разработано Ядро?
export const WhoIsItForCard = ({ img, title }: Props) => {
  return (
    <div>
      <Image src={img} alt={`Card ${title}`} />
      <p className="text-center text-sm text-black mt-1 sm:font-medium sm:text-base md:text-xl md:mt-2 2xl:w-[370px]">
        {title}
      </p>
    </div>
  );
};
