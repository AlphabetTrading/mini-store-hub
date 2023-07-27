
import { GET_ME } from "@/graphql/users/queries";
import {
  useSuspenseQuery,
  useQuery,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { User } from "../../types/user";

const useGetMe = () => {
  return useQuery<User>(GET_ME);
};

export default useGetMe;
