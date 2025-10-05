import create from "./http-service";

export  { CanceledError } from "./api-client";

export interface User {
  id: number;
  name: string;
  address: {
    city: string;
  };
}

export default create("/users");