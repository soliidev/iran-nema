import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { store } from "@/store";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "sonner";
import type { ReactNode } from "react";
import AuthBootstrap from "@/app/AuthBootstrap";

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <QueryProvider>
          <AuthBootstrap />
          {children}
          <Toaster position="top-center" richColors />
        </QueryProvider>
      </HelmetProvider>
    </Provider>
  );
};
