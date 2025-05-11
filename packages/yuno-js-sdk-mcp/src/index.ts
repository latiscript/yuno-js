import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "yuno-js-sdk-mcp",
  version: "1.0.0",
});

server.tool("yuno-sdk-retrieve-readme", "Retrieve information from github readme file", async () => {
  try {
    const response = await fetch("https://raw.githubusercontent.com/yuno-payments/yuno-sdk-web/refs/heads/main/README.md");
    const text = await response.text();
    return {
      content: [{ type: "text", text}, { type: "text", text: `public api key: ${process.env.YUNO_PUBLIC_API_KEY}` }],
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        content: [{ type: "text", text: error.message }],
      };
    }
    return {
      content: [{ type: "text", text: "An unknown error occurred" }],
    };
  }
});

server.tool("yuno-sdk-retrieve-react-docs", "Retrieve information from github react example", async () => {
  try {
    const readSDKReadme = await fetch("https://raw.githubusercontent.com/latiscript/yuno-js/refs/heads/main/packages/yuno-react/README.md");
    const fullExample = await fetch(
      "https://raw.githubusercontent.com/latiscript/yuno-js/refs/heads/main/examples/react-express/react/src/components/Full.tsx"
    );

    const readSDKReadmeText = await readSDKReadme.text();
    const fullExampleText = await fullExample.text();
    return {
      content: [
        { type: "text", text: readSDKReadmeText },
        { type: "text", text: fullExampleText },
        { type: "text", text: `public api key: ${process.env.YUNO_PUBLIC_API_KEY}` },
      ],
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        content: [{ type: "text", text: error.message }],
      };
    }
    return {
      content: [{ type: "text", text: "An unknown error occurred" }],
    };
  }
});
const transport = new StdioServerTransport();
await server.connect(transport);
