import { WhoIsItForCard } from "../WhoIsItForCard";
import { config } from "./config";

// Компонент секции - Для кого разработано Ядро?
export const WhoIsItFor = () => {
  return (
    <div
      id="our_clients"
      className="bg-[#C4F2F2] p-2 md:p-10 2xl:pt-16"
      data-testid={"WhoIsItFor"}
    >
      <div className="font-[cursive] text-black">
        <p className="text-lg font-semibold md:text-2xl 2xl:text-5xl 2xl:mb-3">
          Для кого разработано Ядро?
        </p>
        <p className="md:text-xl sm:mb-2 2xl:text-3xl">
          Программа идеально подходит для салонов:
        </p>
      </div>
      <div
        className="grid grid-cols-3 gap-4 mt-5"
        data-testid={"WhoIsItForCard"}
      >
        {config.map((item) => (
          <WhoIsItForCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};
