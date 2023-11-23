"use client";
import { COMPANY_create } from "@/graphql/mutations/COMPANY_Create";
import { Form, Input, Modal, Radio, notification } from "antd";
import { useState } from "react";

interface Props {
  setIsModalOpen: (isModalOpen: boolean) => void;
}
//Модальное окно с формой для создания новой организации
export const ModalCreateOrganization = ({ setIsModalOpen }: Props) => {
  //Инициализируем форму
  const [form] = Form.useForm();
  //Инициализируем состояние ошибок, здесь будут хранится ошибки, которые возникли при валидации формы
  const [hasErrors, setHasErrors] = useState(false);

  //Обработчик закрытия модального окна, валидирует форму и закрывает окно
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        //Обрабатываем значения формы, свойства с пустыми значениями заменяем на null
        Object.keys(values).forEach((key) => {
          if (!values[key]) {
            values[key] = null;
          }
        });
        //Отправляем запрос для создания организации
        const create = async () => {
          await COMPANY_create(values);
        };
        create();
        //Закрываем модальное окно
        setIsModalOpen(false);
      })
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
    type: string;
    name: string;
    inn: number;
    country: string;
    index: number;
    region: string;
    district: string;
    city: string;
    settlement: string;
    street: string;
    house: string;
    apartment: string;
  };

  return (
    <Modal
      open
      title="Заполните форму, чтобы создать новую организацию"
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
        name="Create Organization"
        onFieldsChange={handleFormFieldsChange}
        onFinishFailed={() => setHasErrors(true)}
        autoComplete="off"
        className="mx-auto flex flex-col items-center mt-20 sm:mt-3 md:mt-20"
      >
        <Form.Item<FieldType>
          name="type"
          rules={[
            {
              required: true,
              message: "Выберите тип",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={"Юр. лицо"}>Юр. лицо</Radio>
            <Radio value={"Физ. лицо"}>Физ. лицо</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item<FieldType>
          label="Наименование организации"
          name="name"
          rules={[{ required: true, message: "Поле не может быть пустым" }]}
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите название" />
        </Form.Item>
        <Form.Item<FieldType>
          label="ИНН"
          name="inn"
          rules={[
            {
              len: 10,
              message: "ИНН должен состоять из 10 цифр",
            },
            {
              pattern: /^[0-9]+$/,
              message: "ИНН должен состоять только из цифр",
            },
          ]}
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите ИНН" />
        </Form.Item>
        Юр. адрес
        <Form.Item<FieldType>
          label="Страна"
          name="country"
          className="mt-2 w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
          initialValue={"Россия"}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<FieldType>
          label="Индекс"
          name="index"
          rules={[
            {
              pattern: /^[0-9]+$/,
              message: "Индекс должен состоять только из цифр",
            },
          ]}
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите индекс" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Регион"
          name="region"
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите регион" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Район"
          name="district"
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите район" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Город"
          name="city"
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите город" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Населенный пункт"
          name="settlement"
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите населенный пункт" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Улица"
          name="street"
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите улицу" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Дом"
          name="house"
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите номер дома" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Квартира"
          name="apartment"
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите номер квартиры" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
