import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// Create an MCP server
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
// server.tool(
//   "yuno-sdk-knowledgebase-retrieve",
//   "Retrieve information from official documentation about what are sdks, benefits and available languages",
//   async () => {
//     const yunoSdkDocs = await fetch("https://docs.y.uno/docs/yuno-sdks");
//     const yunoSdkDocsText = await yunoSdkDocs.text();
//     return {
//       content: [{ type: "text", text: yunoSdkDocsText }],
//     };
//   },
// );
// server.tool(
//   "yuno-sdk-knowledgebase-retrieve",
//   "Retrieve information from official documentation about country coverage",
//   async () => {
//     const countryCoverage = await fetch(
//       "https://docs.y.uno/docs/country-coverage-yuno-sdk",
//     );
//     const countryCoverageText = await countryCoverage.text();
//     return {
//       content: [{ type: "text", text: countryCoverageText }],
//     };
//   },
// );
// server.tool(
//   "yuno-sdk-knowledgebase-retrieve",
//   "Retrieve information from official documentation about what are the kind of web sdk integrations available",
//   async () => {
//     const webSdkIntegrations = await fetch(
//       "https://docs.y.uno/docs/web-sdk-integrations",
//     );
//     const webSdkIntegrationsText = await webSdkIntegrations.text();
//     return {
//       content: [{ type: "text", text: webSdkIntegrationsText }],
//     };
//   },
// );
// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
