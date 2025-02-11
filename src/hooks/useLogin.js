// hooks/useLogin.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useLogin() {
  return useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        "https://wealth-fund-backend.onrender.com/api/users/auth/token",
        data
      );
    },
  });
}
