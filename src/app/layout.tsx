import "@radix-ui/themes/styles.css";
import "src/globals.css";

import { Providers } from "src/components/Providers";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
