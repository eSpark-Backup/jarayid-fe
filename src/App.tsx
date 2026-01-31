import Router from "./route";
import "./App.css";
import { useGetAllCateoriesQuery } from "./services/categories";

function App() {
  const { data } = useGetAllCateoriesQuery(
    {
      page: 1,
      pageSize: 30,
    }
    // { skip: user?.role !== "ADMIN" }
  );
  return (
    <>
      <Router />
    </>
  );
}

export default App;
