import { client } from "@/graphql/client";
import { notification } from "antd";
import { gql } from "graphql-request";

interface ICreateUser_params {
  email: string;
  password: string;
  name: string;
}

interface ICreateUser_response {
  AUTH_createUser: { access_token: string };
}

const query = gql`
  mutation AUTH_createUser($createUser: CreateUserInput!) {
    AUTH_createUser(createUser: $createUser) {
      access_token
    }
  }
`;

export const AUTH_createUser = async (params: ICreateUser_params) => {
  try {
    const { AUTH_createUser } = await client.request<ICreateUser_response>(
      query,
      {
        createUser: params,
      }
    );
    localStorage.setItem("access_token", AUTH_createUser.access_token);
  } catch (error: any) {
    console.error(error);
    notification.error({
      message: "Ошибка регистрации",
      description: error.massage,
    });
  }
};
