import { Header } from "@/components/Header";
import { OurRates } from "@/components/OurRates";
import { Start } from "@/components/Start";
import { WhatIs } from "@/components/WhatIs";
import { WhoIsItFor } from "@/components/WhoIsItFor";
import { YouWillBeAble } from "@/components/YouWillBeAble";
import { getClient } from "@/graphql/graphql-client";
import { IGetOneUser } from "@/graphql/models/getOneUser-response";
import GET_USER from "@/graphql/queries/getOneUser";

const Welcome = async () => {
  const data = await getClient().query<IGetOneUser>({
    query: GET_USER,
    variables: { id: 14 },
  });
  console.log(data);
  return (
    <div className="flex">
      <Header />
      <div
        className="relative max-w-screen-2xl mx-auto mt-10 2-xl:mt-16"
        data-testid={"Welcome"}
      >
        <Start />
        <WhatIs />
        <YouWillBeAble />
        <WhoIsItFor />
        <OurRates />
      </div>
    </div>
  );
};

export default Welcome;
