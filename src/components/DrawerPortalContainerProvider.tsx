import { createContext, useState, useContext, type ReactNode } from "react";

const DrawerPortalContainerContext = createContext<HTMLElement | null>(null);
export function DrawerPortalContainerProvider(props: { children: ReactNode }) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  return (
    <>
      <div ref={setContainer} />
      <DrawerPortalContainerContext.Provider value={container}>
        {props.children}
      </DrawerPortalContainerContext.Provider>
    </>
  );
}

export function useDrawerPortalContainerRef() {
  return useContext(DrawerPortalContainerContext);
}
