import { client } from "@/graphql/client";
import { gql } from "graphql-request";

interface IResponse {
  COMPANY_getAll: {
    id: number;
    name: string;
    inn: string;
  }[];
}

const query = gql`
  query COMPANY_getAll {
    COMPANY_getAll {
      id
      name
      inn
    }
  }
`;

//Возвращает список организаций, в которых пользователь является автором
export const COMPANIES_getMyCompanies = async () => {
  try {
    return await client.request<IResponse>(query);
  } catch (error: any) {
    console.error(error);
  }
};
