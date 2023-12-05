"use client";
import { Table } from "antd";
import { Interface } from "../interface";
import { useState } from "react";
import { ModalCreateService } from "./modalCreateService";

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
  //Инициализируем состояние модального окна, которое регулирует отображение модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Инициализируем состояние данных таблицы
  const [dataSource, setDataSource] = useState([{ key: 1, name: "", INN: "" }]);
  return (
    <>
      <Interface page={"services"} create={setIsModalOpen} />
      <Table columns={columns} dataSource={data} pagination={false} />
      {isModalOpen && (
        <ModalCreateService
          setIsModalOpen={setIsModalOpen}
          setDataSource={setDataSource}
        />
      )}
    </>
  );
};

export default Services;
