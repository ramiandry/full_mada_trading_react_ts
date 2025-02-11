import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useFetchUser from "./useFetchUser";
import { useEffect, useState } from "react";

export default function useFetchAccountById() {
  const [id, setId] = useState<string>("");
  const {data} = useFetchUser();
  
  useEffect(()=>{
    if(data){
      setId(data.userId)
    }
  },[data])

  return useQuery({
    queryKey: ["get-accounts"], // Inclure userId comme dépendance
    queryFn: async () => {
      const response = await axios.post("https://wealth-fund-backend.onrender.com/api/accounts/get-accounts", {
        userId:id
      });
      return response.data;
    }
  });
}
