import logo from "@/public/icon/Logo320.svg";
import salon from "@/public/image/beautySalon.png";
import Image from "next/image";

// Компонент начальной секции стартовой страницы
export const Start = () => {
  return (
    <div className="relative mx-auto" data-testid={"Start"}>
      <Image src={salon} alt="Salon" priority />
      <div className="absolute right-5 bottom-5 sm:right-12 sm:bottom-40 md:right-20 md:bottom-20 2-xl:right-10 2-xl:bottom-20">
        <div className="flex items-center mb-1">
          <Image
            src={logo}
            className="w-11 sm:w-14 md:w-28 2xl:w-40"
            alt="Logo"
          />
          <p className="h-max text-2xl md:text-5xl 2xl:text-9xl font-russo ml-2 2xl:ml-5">
            Ядро
          </p>
        </div>
        <div>
          <p className="text-lg/4 md:text-3xl md:font-medium 2xl:text-7xl 2xl:font-bold">
            Автоматизация
          </p>
          <p className="text-lg/4 md:text-3xl md:font-medium 2xl:text-7xl 2xl:font-bold 2-xl:mt-3">
            салона красоты
          </p>
          <p className="text-xs md:text-xl 2xl:text-4xl 2xl:mt-5">
            - как никогда проста
          </p>
        </div>
      </div>
    </div>
  );
};
