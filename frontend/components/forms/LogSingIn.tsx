"use client";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  AUTH_createUser,
  ICreateUser_params,
} from "@/graphql/mutations/AUTH_CreateUser";
import { AUTH_logIn, ILogIn_params } from "@/graphql/queries/AUTH_LogIn";

type FieldType = {
  firstName?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
};

type FormData = {
  email: string;
  password: string;
  name?: string;
};

interface Props {
  type: "singIn" | "logIn"; //тип формы
}

export const LogSignIn = ({ type }: Props) => {
  //Создаем роутер для перехода на страницу офиса
  const router = useRouter();

  //Создаем стейт для хранения данных введенных пользователем в форму
  const [data, setData] = useState<FormData>();

  //Функция для сохранения данных пользователя из формы в стейт, после успешной валидации данных формы
  const onFinish = (values: any) => {
    const { email, password, firstName } = values;
    setData({ email, password, name: firstName });
  };

  //Функция для отправки запроса для создания нового пользователя и перехода на страницу офиса
  useEffect(() => {
    async function fetchData(
      type: "singIn" | "logIn",
      data: typeof type extends "singIn" ? ICreateUser_params : ILogIn_params
    ) {
      const result =
        type === "singIn"
          ? await AUTH_createUser(data as ICreateUser_params)
          : await AUTH_logIn(data as ILogIn_params);
      result && router.push("/office");
    }
    data && fetchData(type, data);
  });

  return (
    <Form
      name="SingInForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      className="mt-20 sm:mt-3 md:mt-20 mx-auto flex flex-col items-center"
    >
      {type === "singIn" && (
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
      )}

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
      {type === "singIn" && (
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
      )}
      <div className="flex">
        <Link href="/">
          <Button className="text-white mr-5" size="large">
            Назад
          </Button>
        </Link>
        <Form.Item>
          <Button className="text-white" size="large" htmlType="submit">
            {type === "singIn" ? "Зарегистрироваться" : "Войти"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
