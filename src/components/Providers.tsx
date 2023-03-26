"use client";
import { ReactNode, useEffect, useRef } from "react";
import { ThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import { type Store, configureStore } from "src/store";

import { AuthGuard } from "src/components/AuthGuard";
import {
  dependencies,
  registerOnAuthStateChangedListener,
} from "src/dependencies";
import { DrawerPortalContainerProvider } from "src/components/DrawerPortalContainerProvider";

export function Providers(props: { children: ReactNode }) {
  const store = useStore();
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Theme accentColor={"iris"} panelBackground="translucent">
          <DrawerPortalContainerProvider>
            <AuthGuard>{props.children}</AuthGuard>
          </DrawerPortalContainerProvider>
          <Toaster theme="system" position="top-center" />
        </Theme>
      </ThemeProvider>
    </Provider>
  );
}

function useStore() {
  const storeRef = useRef<Store | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  if (!storeRef.current) {
    storeRef.current = configureStore(dependencies);
  }

  useEffect(() => {
    const store = storeRef.current;
    if (store)
      unsubscribeRef.current = registerOnAuthStateChangedListener(store);
    return () => unsubscribeRef.current?.();
  }, []);

  return storeRef.current;
}
