import Full from "./components/Full";
import { YunoProvider } from "@latiscript/yuno-react";

function App() {
  return (
    <YunoProvider
      publicApiKey={import.meta.env.VITE_PUBLIC_API_KEY}
      countryCode="CO"
      language="es"
    >
      <Full />
    </YunoProvider>
  );
}

export default App;
