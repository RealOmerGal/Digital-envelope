import { ReactElement, useEffect } from "react";
import { serverUrl } from "../config";
import { useUserStore } from "../states/user-store";

type Props = {
  children: ReactElement;
};

export const RequireAuth = (props: Props) => {
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      window.location.replace(`${serverUrl}/auth/google`);
    }
  });

  return props.children;
};
