"use client";

import { YunoProvider } from "@latiscript/yuno-react";

export default function Providers({ children }: { children: any }) {
  return (
    <YunoProvider
      publicApiKey={process.env.NEXT_PUBLIC_YUNO_PUBLIC_API_KEY!}
      countryCode="CO"
      language="es"
    >
      {children}
    </YunoProvider>
  );
}
