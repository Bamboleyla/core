"use client";
import { Table } from "antd";
import { Interface } from "../interface";
import { useEffect, useState } from "react";
import { ModalCreateOrganization } from "./modalCreateOrganization";
import { COMPANIES_getMyCompanies } from "@/graphql/queries/COMPANY_getAll";
//Страница списка организации
const Organizations: React.FC = () => {
  //Инициализируем состояние модального окна, которое регулирует отображение модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Инициализируем состояние данных таблицы
  const [dataSource, setDataSource] = useState([{ key: 1, name: "", INN: "" }]);

  // Заглавие столбцов
  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ИНН",
      dataIndex: "INN",
      key: "INN",
    },
  ];

  //Получаем данные список организаций для таблицы
  useEffect(() => {
    //Делаем запрос на получение компаний
    COMPANIES_getMyCompanies().then((result) => {
      //Если получили данные
      if (result) {
        //То преобразуем полученные данные в структуру для таблицы
        const companies = result.COMPANY_getAll.map((company) => ({
          key: company.id,
          name: company.name,
          INN: company.inn,
        }));
        //Обновляем состояние данных таблицы
        setDataSource(companies);
      }
      //Иначе выводим в консоль ошибку
      else
        console.trace(
          "%cВозникла непредвиденная ошибка при получения данных для таблицы",
          "color: red"
        );
    });
  }, []);

  return (
    <>
      <Interface page={"organizations"} create={setIsModalOpen} />
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      {isModalOpen && (
        <ModalCreateOrganization
          setIsModalOpen={setIsModalOpen}
          setDataSource={setDataSource}
        />
      )}
    </>
  );
};

export default Organizations;
