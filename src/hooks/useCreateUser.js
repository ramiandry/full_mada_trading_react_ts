import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useCreateUser() {
  return useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        "https://wealth-fund-backend.onrender.com/api/users/create-user",
        data
      );
    },
  });
}
