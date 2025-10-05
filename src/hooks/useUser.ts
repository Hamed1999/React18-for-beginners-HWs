import { useEffect, useState } from "react";
import userService, { CanceledError, User } from "../services/user-service";

const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
        .then((response) => {
          setUsers(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error instanceof CanceledError) return;
          setError(error.message);
          setIsLoading(false);
        });
      // .finally(() => {
      //   setIsLoading(false);
      // });
      return () => cancel();
    }, [error]);

  return {
    users,
    error,
    isLoading,
    setUsers,
    setError
  };
};

export default useUser;
