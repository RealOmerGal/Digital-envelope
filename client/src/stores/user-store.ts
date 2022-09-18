import create from "zustand";
import { AuthService } from "../services/auth.service";
import User from "../types/user";

interface UserStore {
  user: User;
  storeCurrentUser: () => Promise<void>;
  clearUser: () => Promise<void>;
  storeUpdatedUser: (user: User) => void;
}
const initState: User = {
  email: "",
  firstName: "",
  id: "",
  lastName: "",
};

const useStore = create<UserStore>((set) => ({
  user: initState,
  storeCurrentUser: async () => {
    try {
      const user = await AuthService.getUser();
      set({ user });
    } catch (e) {}
  },
  storeUpdatedUser: (user: User) => {
    set({ user });
  },
  clearUser: async () => {
    try {
      await AuthService.logout();
      set({ user: initState });
    } catch (e) {}
  },
}));

export { useStore as useUserStore };
