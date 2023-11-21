"use client";
import React from "react";
import { Button, Form, Input, InputNumber, Select, TreeSelect } from "antd";
import { usePathname, useRouter } from "next/navigation";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

type FieldType = {
  serviceName?: string;
  group?: string;
  price?: number;
};

export const CreateService: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <Form
      name="Create Service"
      initialValues={{ group: "Услуги", remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      className="mx-auto flex flex-col items-center mt-20 sm:mt-3 md:mt-20"
    >
      <Form.Item<FieldType>
        label={<span className="text-white"> Наименование услуги</span>}
        name="serviceName"
        rules={[{ required: true, message: "Поле не может быть пустым" }]}
        className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
      >
        <Input placeholder="Введите название услуги" />
      </Form.Item>
      <Form.Item<FieldType>
        label={<span className="text-white"> Группа услуг</span>}
        name="group"
        className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
      >
        <TreeSelect
          treeData={[
            {
              title: "Создать новую группу",
              value: "Создать новую группу",
            },
            {
              title: "Услуги",
              value: "Услуги",
              children: [
                {
                  title: "Стрижки",
                  value: "Стрижки",
                  children: [
                    { title: "Мужские", value: "Мужские" },
                    { title: "Женские", value: "Женские" },
                  ],
                },
                {
                  title: "Покраска",
                  value: "Покраска",
                  children: [{ title: "Bamboo", value: "bamboo" }],
                },
              ],
            },
          ]}
        />
      </Form.Item>
      <Form.Item<FieldType>
        label={<span className="text-white"> Цена</span>}
        name="price"
        rules={[{ required: true, message: "Поле не может быть пустым" }]}
        className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
      >
        <InputNumber step={0.01} placeholder="0.00" />
      </Form.Item>
      <div className="flex justify-between w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96">
        <Form.Item>
          <Button className="text-white" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            className="text-white"
            onClick={() => router.push(pathName.replace("/create", ""))}
          >
            Отмена
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
