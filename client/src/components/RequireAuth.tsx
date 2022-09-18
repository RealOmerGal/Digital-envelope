import { ReactElement, useEffect } from "react";
import { AuthService } from "../services/auth.service";
import { useUserStore } from "../stores/user-store";

type Props = {
  children: ReactElement;
};

export const RequireAuth = (props: Props) => {
  const { user } = useUserStore();

  useEffect(() => {
    if (user.id === "") {
      AuthService.login();
    }
  }, []);

  return props.children;
};
