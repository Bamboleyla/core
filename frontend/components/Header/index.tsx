"use client";
import * as React from "react";
import logo from "@/public/icon/core.svg";
import Image from "next/image";
import { Anchor, Button } from "antd";
import Link from "next/link";

//Header главного окна
export const Header = () => {
  return (
    <div
      className="fixed mx-auto w-full py-1 bg-slate-400 z-10"
      data-testid={"Header"}
    >
      <div className=" w-11/12 2xl:h-14 mx-auto text-white gap-x-5 max-w-screen-2xl min-w-max">
        <div className="flex justify-between items-center gap-x-2">
          {/* Логотип */}
          <div className="flex items-center gap-x-2">
            <Image className="w-8 2xl:w-14" src={logo} alt="logo" />
            <div className="text-xl 2xl:text-2xl font-russo">ЯДРО</div>
          </div>
          {/* Навигация по странице */}
          <div className=" hidden md:flex justify-between items-center">
            <Anchor
              direction="horizontal"
              items={[
                {
                  key: "part-1",
                  href: "#description",
                  title: (
                    <div className="text-white 2xl:text-2xl">Описание</div>
                  ),
                },
                {
                  key: "part-2",
                  href: "#opportunities",
                  title: (
                    <div className="text-white 2xl:text-2xl">Возможности</div>
                  ),
                },
                {
                  key: "part-3",
                  href: "#our_clients",
                  title: (
                    <div className="text-white 2xl:text-2xl">Наши клиенты</div>
                  ),
                },
                {
                  key: "part-4",
                  href: "#rates",
                  title: <div className="text-white 2xl:text-2xl">Тарифы</div>,
                },
              ]}
            />
          </div>
          {/* Отображение кнопки до 1536px после скрыта */}
          <Link href="/signIn">
            <Button className="2xl:hidden mb-0.5" ghost size="small">
              Попробовать бесплатно
            </Button>
            {/* Отображение кнопки после 1536px до скрыта */}
            <Button className="hidden 2xl:block" ghost size="large">
              Попробовать бесплатно
            </Button>
          </Link>
          <Link href="logIn">
            <Button className="2xl:hidden mb-0.5 " ghost size="small">
              Войти
            </Button>
            {/* Отображение кнопки после 1536px до скрыта */}
            <Button className="hidden 2xl:block" ghost size="large">
              Войти
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
