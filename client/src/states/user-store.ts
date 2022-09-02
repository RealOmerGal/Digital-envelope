import create from "zustand";
import User from "../types/user";

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}
const initState: User = {
  email: "",
  firstName: "",
  id: "",
  lastName: "",
};

const useStore = create<UserStore>((set) => ({
  user: initState,
  setUser: (user: User) => set((state) => ({ user })),
  clearUser: () => set((state) => ({ user: initState })),
}));

export { useStore as useUserStore };
