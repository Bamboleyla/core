"use client";
import React, { useState } from "react";
import {
  BookOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/navigation";

const items: MenuProps["items"] = [
  {
    label: "Справочники",
    key: "References",
    icon: <BookOutlined />,
    children: [
      {
        label: "Предприятие",
        key: "company",
        children: [
          {
            label: "Организации",
            key: "organizations",
          },
          {
            label: "Склады",
            key: "warehouses",
          },
          {
            label: "Должности организации",
            key: "positions",
          },
          {
            label: "Сотрудники организации",
            key: "staff",
          },
        ],
      },
      {
        label: "Товары",
        key: "products",
      },
      {
        label: "Контрагенты",
        key: "counterparties",
        children: [
          {
            label: "Поставщики",
            key: "suppliers",
          },
          {
            label: "Клиенты",
            key: "clients",
          },
        ],
      },
      {
        label: "Услуги",
        key: "services",
      },
    ],
  },
  {
    label: "Документы",
    key: "Documents",
    icon: <FileTextOutlined />,
    children: [],
  },
  {
    label: "Отчеты",
    key: "Reports",
    icon: <BarChartOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
];

export const HeaderOffice: React.FC = () => {
  //Создаем роутер для перехода на страницу офиса
  const router = useRouter();

  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "suppliers") {
      router.push("/office/suppliers");
    } else if (e.key === "clients") {
      router.push("/office/clients");
    } else if (e.key === "products") {
      router.push("/office/products");
    } else if (e.key === "services") {
      router.push("/office/services");
    } else if (e.key === "organizations") {
      router.push("/office/organizations");
    }
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
