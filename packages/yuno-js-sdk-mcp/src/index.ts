import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "yuno-js-sdk-mcp",
  version: "1.0.0",
});

server.tool("yuno-sdk-knowledgebase-retrieve", "Retrieve information from github readme file", async () => {
  const response = await fetch("https://raw.githubusercontent.com/yuno-payments/yuno-sdk-web/refs/heads/main/README.md");
  const text = await response.text();
  return {
    content: [{ type: "text", text }],
  };
});

server.tool("yuno-sdk-knowledgebase-retrieve", "Retrieve information from github react example", async () => {
  const fullExample = await fetch(
    "https://raw.githubusercontent.com/latiscript/yuno-js/refs/heads/main/examples/react-express/react/src/components/Full.tsx"
  );

  const fullImplementation = await fetch(
    "https://raw.githubusercontent.com/latiscript/yuno-js/refs/heads/main/packages/yuno-react/src/components/full/Full.tsx"
  );

  const fullImplementationTypes = await fetch(
    "https://raw.githubusercontent.com/latiscript/yuno-js/refs/heads/main/packages/yuno-react/src/components/full/types.ts"
  );

  const fullExampleText = await fullExample.text();
  const fullImplementationText = await fullImplementation.text();
  const fullImplementationTypesText = await fullImplementationTypes.text();
  return {
    content: [
      { type: "text", text: fullExampleText },
      { type: "text", text: fullImplementationText },
      { type: "text", text: fullImplementationTypesText },
    ],
  };
});
const transport = new StdioServerTransport();
await server.connect(transport);
