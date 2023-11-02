"use client";
import Image from "next/image";
import bg from "@/public/image/SignInBG.jpg";
import { Button, Form, Input } from "antd";
import Link from "next/link";

type FieldType = {
  firstName?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
};

const SignIn = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Image
        src={bg}
        alt="Login form"
        priority
        className="mx-auto w-full sm:w-4/12 md:w-full lg:w-5/12 2xl:w-4/12"
      />
      <Form
        name="LogInForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full mt-20 sm:mt-3 md:mt-20 mx-auto flex flex-col items-center"
      >
        <Form.Item<FieldType>
          name="firstName"
          rules={[{ required: true, message: "Поле не может быть пустым" }]}
          className="sm:mb-2 md:mb-5 w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите ваше имя" />
        </Form.Item>
        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: "Поле не может быть пустым" }]}
          className="sm:mb-2 md:mb-5 w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите ваш email" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Поле не может быть пустым" }]}
          className="sm:mb-2 md:mb-5 w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item<FieldType>
          name="repeatPassword"
          rules={[{ required: true, message: "Поле не может быть пустым" }]}
          className="sm:mb-2 md:mb-5 w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input.Password placeholder="Повторите пароль" />
        </Form.Item>
        <div className="flex">
          <Link href="/">
            <Button className="text-white mr-5" size="large">
              Назад
            </Button>
          </Link>
          <Form.Item>
            <Button className="text-white" size="large" htmlType="submit">
              Зарегистрироваться
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default SignIn;
