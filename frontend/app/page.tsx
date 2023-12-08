"use client";
import { Header } from "@/components/Header";
import { OurRates } from "@/components/OurRates";
import { Start } from "@/components/Start";
import { WhatIs } from "@/components/WhatIs";
import { WhoIsItFor } from "@/components/WhoIsItFor";
import { YouWillBeAble } from "@/components/YouWillBeAble";
import { AuthGraphql } from "@/graphql/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Welcome = () => {
  //Создаем роутер который будем использовать для перевода на страницу офиса всех авторизованных пользователей
  const router = useRouter();

  useEffect(() => {
    //Проверяем авторизован ли пользователь, если да, то переводим на страницу офиса, если нет то нечего не делаем
    const isUserAuthorized = async () => {
      const result = await AuthGraphql.getToken();
      result && router.push("/office");
    };
    isUserAuthorized();
  });

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
