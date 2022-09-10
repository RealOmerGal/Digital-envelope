import create from "zustand";
import { AuthService } from "../services/auth.service";
import User from "../types/user";

interface UserStore {
  user: User;
  storeUser: () => Promise<void>;
  clearUser: () => Promise<void>;
}
const initState: User = {
  email: "",
  firstName: "",
  id: "",
  lastName: "",
};

const useStore = create<UserStore>((set) => ({
  user: initState,
  storeUser: async () => {
    const user = await AuthService.getUser();
    set({ user });
  },
  clearUser: async () => {
    await AuthService.logout();
    set(({ user: initState }))
  },
}));

export { useStore as useUserStore };
