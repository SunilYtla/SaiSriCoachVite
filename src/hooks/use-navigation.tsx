import { useContext } from "react";
import {
  NavigationContext,
  NavigationContextProps,
} from "../context/navigation";

function useNavigation(): NavigationContextProps {
  return useContext(NavigationContext) as NavigationContextProps;
}

export default useNavigation;
