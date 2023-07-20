import { GET_ME } from "@/graphql/queries/userQueries";
import { useSuspenseQuery ,useQuery} from "@apollo/experimental-nextjs-app-support/ssr";

const useGetMe = () =>{
 return useQuery(GET_ME);
}

export default useGetMe;