import Layout from "../components/layouts/Layout";
import { RepositoriesList } from "../components/RespositriesList";

const Search:React.FC=()=>{
    return(
      <Layout>
        <RepositoriesList/>
      </Layout>
    )
}

export default Search;