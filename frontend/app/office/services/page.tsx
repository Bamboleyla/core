import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Interface } from "../interface";

interface DataType {
  key: React.ReactNode;
  name: React.JSX.Element | string;
  price?: number;
  children?: DataType[];
}

const columns: ColumnsType<DataType> = [
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

const data: DataType[] = [
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
  return (
    <>
      <Interface page={"services"} />
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default Services;
