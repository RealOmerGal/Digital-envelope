import { ReactElement, useEffect } from "react";
import { serverUrl } from "../config";
import { useUserStore } from "../stores/user-store";

type Props = {
  children: ReactElement;
};

export const RequireAuth = (props: Props) => {
  const { user } = useUserStore();

  useEffect(() => {
    if (user.id === "") {
      window.location.replace(`${serverUrl}/auth/google`);
    }
  });

  return props.children;
};
