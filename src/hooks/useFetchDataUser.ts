import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchDataUser() {
 var email = localStorage.getItem('user');
  return useQuery({
    queryKey: ["https://wealth-fund-backend.onrender.com/api/users/get-user-details"], // Identifiant unique pour la requête
    queryFn: async () => {
      const response = await axios.post("https://wealth-fund-backend.onrender.com/api/users/get-user-details",{email:email}); // Faites une requête GET à l'API
      return response.data; // Retournez uniquement les données utiles
    },
  });
}
