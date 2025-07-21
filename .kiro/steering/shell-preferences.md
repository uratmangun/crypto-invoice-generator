---
inclusion: always
---

# Shell Execution Standards

## Fish Shell Requirement

**CRITICAL**: Always use fish shell syntax for terminal command execution. Never use bash syntax.

### Core Syntax Rules

- **Variables**: `set VAR_NAME value` (not `export VAR=value`)
- **Environment Variables**: `set -x VAR_NAME value`
- **Conditionals**: `if condition; command; end`
- **Command Chaining**: Use `; and` instead of `&&`, `; or` instead of `||`

### Common Patterns

```fish
# Environment setup
set -x NODE_ENV production

# Conditional execution
if test -f package.json; npm install; end

# Variable assignment and usage
set PROJECT_ID (grep '^project_id' config.toml | cut -d'"' -f2)
echo "Project: $PROJECT_ID"
```

### Key Differences from Bash

| Bash | Fish |
|------|------|
| `export VAR=value` | `set -x VAR value` |
| `cmd1 && cmd2` | `cmd1; and cmd2` |
| `cmd1 \|\| cmd2` | `cmd1; or cmd2` |
| `if [ condition ]` | `if test condition` |

This ensures consistent shell syntax across all project operations.