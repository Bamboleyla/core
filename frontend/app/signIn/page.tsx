"use client";
import Image from "next/image";
import bg from "@/public/image/signInBG.png";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AUTH_createUser } from "@/graphql/queries/entities/AUTH/logIn";

type FieldType = {
  firstName?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
};

const SignIn = () => {
  const [data, setData] = useState({ email: "", password: "", name: "" });
  const onFinish = (values: any) => {
    const { email, password, firstName } = values;
    setData({ email, password, name: firstName });
  };
  useEffect(() => {
    async function fetchData() {
      await AUTH_createUser(data);
    }
    data.email !== "" && fetchData();
  });

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
        autoComplete="off"
        className="w-full mt-20 sm:mt-3 md:mt-20 mx-auto flex flex-col items-center"
      >
        <Form.Item<FieldType>
          name="firstName"
          validateFirst
          rules={[
            {
              required: true,
              message: "Поле не может быть пустым",
              validateTrigger: "onBlur",
            },
            {
              min: 2,
              message: "Имя не может быть меньше двух символов",
              validateTrigger: "onBlur",
            },
            {
              max: 20,
              message: "Имя не может быть больше двадцати символов",
              validateTrigger: "onBlur",
            },
            {
              pattern: /^[а-яА-Я]+$/,
              message: "Имя должно содержать только кириллические буквы",
              validateTrigger: "onBlur",
            },
          ]}
          className="sm:mb-2 md:mb-5 w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите ваше имя" />
        </Form.Item>
        <Form.Item<FieldType>
          name="email"
          validateFirst
          rules={[
            {
              required: true,
              message: "Поле не может быть пустым",
              validateTrigger: "onBlur",
            },
            {
              type: "email",
              message: "Некорректный email",
              validateTrigger: "onBlur",
            },
          ]}
          className="sm:mb-2 md:mb-5 w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input placeholder="Введите ваш email" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          validateFirst
          rules={[
            {
              required: true,
              message: "Поле не может быть пустым",
              validateTrigger: "onBlur",
            },
            {
              min: 8,
              message: "Пароль должен содержать не менее 8 символов",
              validateTrigger: "onBlur",
            },
            {
              pattern: /[A-Z]/,
              message: "Пароль должен содержать хотя бы одну заглавную букву",
              validateTrigger: "onBlur",
            },
            {
              pattern: /[a-z]/,
              message: "Пароль должен содержать хотя бы одну строчную букву",
              validateTrigger: "onBlur",
            },
            {
              pattern: /[0-9]/,
              message: "Пароль должен содержать хотя бы одну цифру",
              validateTrigger: "onBlur",
            },
            {
              pattern: /[!@#$%^&*]/,
              message:
                "Пароль должен содержать хотя бы один специальный символ !@#$%^&*",
              validateTrigger: "onBlur",
            },
            {
              pattern: /^[A-Za-z0-9!@#$%^&*]*$/,
              message: "Пароль не может содержать нелатинские символы",
              validateTrigger: "onBlur",
            },
          ]}
          className="sm:mb-2 md:mb-5 w-4/6 sm:w-5/12 lg:w-3/12 2xl:w-96"
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item<FieldType>
          name="repeatPassword"
          validateFirst
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Поле не может быть пустым",
              validateTrigger: "onBlur",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают"));
              },
            }),
          ]}
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
