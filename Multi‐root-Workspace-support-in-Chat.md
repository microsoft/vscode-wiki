# Choose a primary directory for a Chat within a multi-root workspace

When you start a Copilot, Claude, or Codex agent session from the Chat view in a [multi-root workspace](https://code.visualstudio.com/docs/editing/workspaces/multi-root-workspaces), the agent can work across all folders in the workspace.

However, every session uses one workspace folder as its **primary directory**. The primary directory is the current working directory for the agent harness. Some hooks and other provider-specific configurations are loaded only from this directory.

The primary directory is fixed after the session starts. To use a different primary directory, start a new session and select the other folder before sending your first request.

> [!IMPORTANT]
> Selecting a primary directory does not restrict the agent to that folder. The agent can still read and modify files in all folders in the workspace.

Consider a workspace with two folders:

```text
my-workspace
├── frontend
│   └── .github/hooks/
└── backend
    └── .github/hooks/

## Why the primary directory matters

The following features currently depend on the primary directory:

| Agent harness | Loaded from the primary directory |
| ------------- | --------------------------------- |
| **Copilot** | Workspace [hooks](/docs/agent-customization/hooks) from `.github/hooks/` |
| **Claude** | Hooks from `.claude/settings.json` or `.claude/settings.local.json`, and MCP servers from `.mcp.json` |
| **Codex** | Hooks from `.codex/hooks.json`, and Codex instructions and rules |

For example, if you select the `backend` folder as the primary directory:

- The agent can still work in both the `frontend` and `backend` folders.
- Only hooks from the `backend` folder are used by the session.
- With Claude, only MCP servers from `backend/.mcp.json` are loaded.
- With Codex, only instructions and rules that apply to the `backend` folder are used.

Only the provider-specific configuration listed in the table is affected. For example, the Claude limitation applies to `.mcp.json`; MCP servers configured in `.vscode/mcp.json` can still be discovered from all workspace folders.

## When the folder picker appears

When you create a session, VS Code checks which workspace folders contain configuration that depends on the primary directory.

A folder is considered relevant when it contains the following configuration:

| Agent harness | Relevant configuration |
| ------------- | ---------------------- |
| **Copilot** | One or more `.json` hook files under `.github/hooks/` |
| **Claude** | A `.mcp.json` file or enabled hooks in `.claude/settings.json` or `.claude/settings.local.json` |
| **Codex** | A `.codex/hooks.json` file |
