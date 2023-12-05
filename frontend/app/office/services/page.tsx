"use client";
import { Table } from "antd";
import { Interface } from "../interface";
import { useState } from "react";
import { ModalCreateService } from "./modalCreateService";
import { ModalCreateGroupService } from "./modalCreateGroupService";

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
  //Инициализируем состояние данных таблицы
  const [dataSource, setDataSource] = useState([{ key: 1, name: "", INN: "" }]);
  return (
    <>
      <Interface
        page={"services"}
        create={setIsCreateModalOpen}
        createGroup={setIsCreateGroupModalOpen}
      />
      <Table columns={columns} dataSource={data} pagination={false} />
      {isCreateModalOpen && (
        <ModalCreateService
          setIsModalOpen={setIsCreateModalOpen}
          setDataSource={setDataSource}
        />
      )}
      {isCreateGroupModalOpen && (
        <ModalCreateGroupService
          setIsModalOpen={setIsCreateGroupModalOpen}
          setDataSource={setDataSource}
        />
      )}
    </>
  );
};

export default Services;
