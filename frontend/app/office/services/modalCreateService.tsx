"use client";
import {
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  TreeSelect,
  notification,
} from "antd";
import { useState } from "react";

const data = [
  {
    value: "Услуги",
    title: "Услуги",
    children: [
      {
        value: "Стрижка",
        title: "Стрижка",
        children: [
          {
            value: "Мужская",
            title: "Мужская",
          },
          {
            value: "Женская",
            title: "Женская",
          },
        ],
      },
      {
        value: "Покраска",
        title: "Покраска",
        children: [],
      },
    ],
  },
];

interface Props {
  setIsModalOpen: (isModalOpen: boolean) => void; // Инициализируем состояние модального окна, которое регулирует отображение модального окна
  setDataSource: (
    dataSource: {
      key: number; //Идентификатор строки
      name: string; // Название организации
      INN: string; // ИНН организации
    }[]
  ) => void; // Инициализируем состояние данных таблицы
}
//Модальное окно с формой для создания новой организации
export const ModalCreateService = ({
  setIsModalOpen,
  setDataSource,
}: Props) => {
  //Инициализируем форму
  const [form] = Form.useForm();
  //Инициализируем состояние ошибок, здесь будут хранится ошибки, которые возникли при валидации формы
  const [hasErrors, setHasErrors] = useState(false);

  //Обработчик закрытия модального окна, валидирует форму и закрывает окно
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => console.log(values))
      .catch((errorInfo) => {
        //В случае ошибки валидации формы, сообщаем пользователю
        notification.error({
          message: "Ошибка заполнения формы",
          description: "Некоторые поля заполнены некорректно",
        });
        //И выводим ошибки в консоль
        console.log("Failed:", errorInfo);
      });
  };
  //Обработчик изменения полей формы, нужен для проверки наличия ошибок и при их наличии блокировки кнопки "Создать"
  const handleFormFieldsChange = (changedFields: any, allFields: any) => {
    // Проверяем наличие ошибок во всех полях формы
    const hasFormErrors = allFields.some(
      (field: any) => field.errors && field.errors.length > 0
    );
    setHasErrors(hasFormErrors);
  };

  type FieldType = {
    group: string;
    name: string;
    price: string;
  };

  return (
    <Modal
      open
      title="Заполните форму, чтобы создать новую услугу"
      onOk={handleOk}
      onCancel={() => setIsModalOpen(false)}
      okType="default"
      okText="Создать"
      cancelText="Отмена"
      okButtonProps={{
        disabled: hasErrors,
      }}
    >
      <Form
        form={form}
        name="Create Service"
        onFieldsChange={handleFormFieldsChange}
        onFinishFailed={() => setHasErrors(true)}
        autoComplete="off"
        className="mx-auto flex flex-col items-center mt-20 sm:mt-3 md:mt-20"
      >
        <Form.Item<FieldType>
          label="Название услуги"
          name="name"
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
          rules={[
            {
              required: true,
              message: "Введите название",
            },
          ]}
        >
          <Input placeholder="Введите название" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Группа услуг"
          name="group"
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
          rules={[
            {
              required: true,
              message: "Выберите группу",
            },
          ]}
        >
          <TreeSelect treeData={data} placeholder="Выберите группу услуг" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Цена"
          name="price"
          rules={[
            {
              required: true,
              message: "Укажите цену",
            },
            {
              pattern: /^(?!-)\d/,
              message: "Цена не может быть отрицательной",
            },
            {
              pattern: /^(?!-)(?:[0-9]+\.[0-9]{2,}|[1-9][0-9]*)$/,
              message: "Цена не может содержать значение меньше сотой",
            },
          ]}
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <InputNumber
            addonAfter="руб."
            placeholder="Введите цену"
            formatter={(value) => (value ? `${value}`.replace(",", ".") : "")}
            parser={(value) => (value ? `${value}`.replace(",", ".") : "")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
