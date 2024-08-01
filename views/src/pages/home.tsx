import { useQuery } from "@tanstack/react-query";
import { keyListExpenses } from "../modules/expense/services/keys";
import { API_URL } from "../modules/core/config/environment";

const HomePage = () => {
  const { data: expenses } = useQuery<any>({
    queryKey: keyListExpenses(),
  });

  console.log(API_URL);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
