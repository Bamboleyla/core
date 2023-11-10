import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUser($id: ID!) {
    getOneUser(id: $id) {
      id
      name
      email
      role
      password
    }
  }
`;

export default GET_USER;
