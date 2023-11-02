"use client";
import Image from "next/image";
import bg from "@/public/image/LogInBG.jpg";
import { Button, Form, Input } from "antd";
import Link from "next/link";

type FieldType = {
  email?: string;
  password?: string;
};

const LogIn = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="mx-auto">
      <Image
        src={bg}
        alt="Login form"
        className="mx-auto sm:w-5/12 md:w-full lg:w-5/12 2xl:w-4/12"
        priority
      />
      <Form
        name="LogInForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mt-20 sm:mt-3 md:mt-20 mx-auto flex flex-col items-center"
      >
        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: "Поле не может быть пустым" }]}
          className="w-4/6 sm:mb-3 sm:w-5/12 md:mb-5 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите почту" />
        </Form.Item>
        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Поле не может быть пустым" }]}
          className="w-4/6 sm:mb-3 sm:w-5/12 md:mb-5 lg:w-3/12 2xl:w-96"
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>
        <div className="flex">
          <Link href="/">
            <Button className="text-white mr-5" size="large">
              Назад
            </Button>
          </Link>
          <Form.Item>
            <Button className="text-white" size="large" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </div>
        <a href="/reset" className="text-white sm:-mt-3 md:mt-0">
          Не помните пароль?
        </a>
      </Form>
    </div>
  );
};

export default LogIn;
