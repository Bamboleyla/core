"use client";
import { Table, Tabs } from "antd";
import type { TabsProps } from "antd";
import { Interface } from "../interface";
import { useState, useEffect } from "react";
import { ModalCreateService } from "./modalCreateService";
import { ModalCreateGroupService } from "./modalCreateGroupService";
import { CompanyGraphql } from "@/graphql/company";

const columns = [
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
  },
];

const data = [
  {
    key: 0,
    name: <strong>Услуги</strong>,
    children: [
      {
        key: 1,
        name: <strong>Стрижка</strong>,
        children: [
          {
            key: 11,
            name: <strong>Мужская</strong>,
            children: [
              {
                key: 111,
                name: "Модельная",
                price: 400.0,
              },
              {
                key: 112,
                name: "Под насадку",
                price: 300,
              },
            ],
          },
          { key: 12, name: <strong>Женская</strong> },
        ],
      },
      {
        key: 2,
        name: <strong>Покраска</strong>,
      },
    ],
  },
];

const Services: React.FC = () => {
  //Инициализируем состояния модальных окон, которое регулируют отображение модальных окон
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  //Инициализируем состояние Tabs
  const [items, setItems] = useState<TabsProps["items"]>([]);
  //Инициализируем состояние данных таблицы
  const [dataSource, setDataSource] = useState([]);
  //Хранит данные о идентификаторе организации с которой в данный момент работает пользователь
  const [companyID, setCompanyID] = useState("");

  useEffect(() => {
    //Создаем данные для Tabs, в каждый таб помешаем таблицу
    const initTabs = async () => {
      //Получаем заголовки для Tabs
      const titles = await CompanyGraphql.getTitlesForTabs();
      if (titles) {
        titles.forEach(
          //Добавляем к заголовкам таблицы с услугами для именно этого таба
          (title) =>
            (title.children = (
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
              />
            ))
        );
      }
      setItems(titles);
    };

    initTabs();
  }, []);

  return (
    <>
      <Interface
        page={"services"}
        create={setIsCreateModalOpen}
        createGroup={setIsCreateGroupModalOpen}
      />
      {items?.length !== 0 && (
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={(key) => setCompanyID(key)}
        />
      )}
      {isCreateModalOpen && (
        <ModalCreateService
          setIsModalOpen={setIsCreateModalOpen}
          setDataSource={console.log}
          companyID={companyID}
        />
      )}
      {isCreateGroupModalOpen && (
        <ModalCreateGroupService
          setIsModalOpen={setIsCreateGroupModalOpen}
          setDataSource={console.log}
          companyID={companyID}
        />
      )}
    </>
  );
};

export default Services;
