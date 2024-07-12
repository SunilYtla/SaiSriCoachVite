import React, { createContext, useState, ReactNode, useEffect } from "react";

// Define the type for the context
interface NavigationContextProps {
  // Add any properties or methods you need for navigation
  // For example:
  currentPath: string;
  navigateTo: (route: string) => void;
}

// Create the context with an initial state
const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

// Define the props for the NavigationProvider
interface NavigationProviderProps {
  children: ReactNode;
}

// Create the NavigationProvider component
const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  // State for managing the current route
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname
  );

  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handler);

    const cleanup = () => {
      window.removeEventListener("popstate", handler);
    };

    return cleanup;
  }, []);

  // Method to navigate to a new route
  const navigateTo = (route: string) => {
    window.history.pushState({}, "", route);
    setCurrentPath(route);
    // Add any additional logic for navigation, such as updating URL, etc.
  };

  // Create the context value
  const contextValue: NavigationContextProps = {
    currentPath,
    navigateTo,
  };

  // Provide the context value to the children
  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationProvider, NavigationContext };
export type { NavigationContextProps };
