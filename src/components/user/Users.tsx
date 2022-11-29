import React, { useEffect, useState } from "react";
import { UsersList } from "./UsersList";
import { User } from "./userInterfaces";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { useHttpClient } from "../../app/hooks/useHttpClient";

import "../../styles/users-list.scss";

export const Users: React.FC = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState<User[]>([]);
  React.useEffect(() => {
    (async () => {
      try {
        let res: any = await sendRequest("users");

        console.log(res);

        let userData = res.data.users as User[];
        setUsers(userData);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [sendRequest]);

  const modalProps: any = {
    error,
    onClear: clearError,
  };
  return (
    <>
      <ErrorModal {...modalProps} />
      <div>
        {isLoading && <LoadingSpinner asOverlay={true} />}
        <UsersList users={users} />
      </div>
    </>
  );
};
