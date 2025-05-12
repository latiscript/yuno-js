# @latiscript/yuno-js-sdk-mcp

> MCP server for the Yuno Web SDK as Model Context Protocol (MCP) tools

This package provides an MCP server that exposes the Yuno Web SDK as Model Context Protocol tools, enabling programmatic access for AI agents, automation, and advanced workflows.

## Features

- Exposes Yuno Web SDK endpoints as MCP tools
- Enables AI and automation workflows with Yuno's web-based checkout
- TypeScript support
- Easy integration with [Cursor](https://www.cursor.so/) and other MCP-compatible agents

---

## Using with Cursor or Claude Desktop

You can use this MCP server with [Cursor](https://www.cursor.so/) or [Claude Desktop](https://www.anthropic.com/claude) to enable AI-driven payment flows, customer creation, and more.

### 1. Build the Project

Clone this project and build it locally:

```bash
git clone https://github.com/yourusername/yuno-js.git
cd yuno-js/packages/yuno-js-sdk-mcp
npm install
npm run build
```

### 2. Set Up Your Yuno API Credentials

- Set your Yuno public API key using environment variables (see config examples below).

### 3. Add the MCP Server to Cursor

1. Open Cursor Settings (`Cmd+Shift+P` → "Cursor Settings").
2. Go to the "MCP" section and click "Add new global MCP server".
3. Add the following config (replace the path with your actual build output):

```json
{
  "mcpServers": {
    "yuno": {
      "type": "command",
      "command": "node ABSOLUTE_PATH_TO_BUILD/index.js",
      "env": {
        "YUNO_PUBLIC_API_KEY": "your_public_api_key"
      }
    }
  }
}
```
> **Tip:** Right-click on your `/build/index.js` file and select "Copy Path" to get the absolute path.

### 4. Add the MCP Server to Claude Desktop

1. Open Claude Desktop settings → "Developer" tab → Edit Config.
2. Add the following config:

```json
{
  "mcpServers": {
    "yuno": {
      "command": "node",
      "args": [
        "ABSOLUTE_PATH_TO_BUILD/index.js"
      ],
      "env": {
        "YUNO_PUBLIC_API_KEY": "your_public_api_key"
      }
    }
  }
}
```

### 5. Test the Integration

- In Cursor or Claude, select a Markdown file or chat and ask the agent to use the `yuno` tool.
- Make sure your environment variables are set correctly.

---

**Required environment variable:**

- `YUNO_PUBLIC_API_KEY`

---

## Related Packages

- [@latiscript/yuno-node](../yuno-node/README.md): Node.js SDK for Yuno
- [@latiscript/yuno-react](../yuno-react/README.md): React SDK for Yuno

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, bugs, or feature requests, please [open an issue](https://github.com/latiscript/yuno-js/issues) in our GitHub repository. For official Yuno support, please visit [Yuno's official documentation](https://docs.yuno.com). 