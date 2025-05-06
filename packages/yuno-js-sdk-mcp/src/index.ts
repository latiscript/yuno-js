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

const transport = new StdioServerTransport();
await server.connect(transport);
