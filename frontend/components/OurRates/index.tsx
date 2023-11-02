import { CardForOurRates } from "@/components/CardForOurRates";
import { config } from "./config";

// Компонент с описанием тарифов
export const OurRates = () => {
  return (
    <div
      id="rates"
      className="bg-[#FCFEAA] p-2 pb-5 md:pb-20 md:pt-10 md:px-10 text-black"
      data-testid={"OurRates"}
    >
      <div className="font-[cursive]">
        <p className="text-lg font-semibold md:text-2xl 2xl:text-5xl 2xl:mb-3">
          Наши тарифы,
        </p>
        <p className="md:text-xl sm:mb-2 2xl:text-3xl">
          могут позволить абсолютно все.
        </p>
      </div>
      <div className="flex gap-5 justify-around mt-5 md:mt-10">
        {config.map(({ img, title, subTitle, description }) => (
          <CardForOurRates
            key={title}
            img={img}
            title={title}
            subTitle={subTitle}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};
