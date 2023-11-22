"use client";
import { Table } from "antd";
import { Interface } from "../interface";
import { useState } from "react";
import { ModalCreateOrganization } from "./modalCreateOrganization";
//Страница списка организации
const Organizations = () => {
  //Инициализируем состояние модального окна, которое регулирует отображение модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Данные строк таблицы
  const dataSource = [{ key: 1 }];
  // Заглавие столбцов
  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Юридический адрес",
      dataIndex: "legalAddress",
      key: "legalAddress",
    },
  ];

  return (
    <>
      <Interface page={"organizations"} create={setIsModalOpen} />
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      {isModalOpen && (
        <ModalCreateOrganization setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};

export default Organizations;
