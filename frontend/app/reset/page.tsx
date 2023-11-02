"use client";
import Image from "next/image";
import img from "@/public/image/resetP.jpg";
import { Button, Input, Form } from "antd";
import Link from "next/link";

type FieldType = {
  email?: string;
};

const Reset = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="mx-auto">
      <Image
        src={img}
        alt="Reset form"
        className="mx-auto w-full sm:w-5/12 md:w-full lg:w-5/12 2xl:w-4/12"
        priority
      />
      <Form
        name="resetPasswordForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mt-20 sm:mt-3 md:mt-20 mx-auto flex flex-col items-center"
      >
        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: "Поле не может быть пустым" }]}
          className="w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите email" />
        </Form.Item>
        <div className="flex">
          <Link href="/logIn">
            <Button className="text-white mr-5" size="large">
              Назад
            </Button>
          </Link>
          <Form.Item>
            <Button className="text-white" size="large" htmlType="submit">
              Сбросить пароль
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default Reset;
