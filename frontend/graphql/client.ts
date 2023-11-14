import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:5000/graphql";

export const client = new GraphQLClient(endpoint);

const token = localStorage.getItem("access_token");
token && client.setHeader("Authorization", `Bearer ${token}`);
