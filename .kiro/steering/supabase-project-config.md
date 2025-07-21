---
inclusion: fileMatch
fileMatchPattern: ['supabase/**/*', '**/supabase/**/*', '**/*supabase*']
---

# Supabase Project Configuration

## Core Principles

- **Dynamic Project ID**: Always read project ID from `supabase/config.toml`
- **No Hardcoding**: Never hardcode project IDs in scripts or code
- **Container Consistency**: All containers use `_[PROJECT_ID]` suffix pattern

## Project ID Detection

```fish
set PROJECT_ID (grep '^project_id' supabase/config.toml | cut -d'"' -f2)
```

## Configuration Standards

1. Read project ID from `supabase/config.toml` before any Supabase operation
2. Validate config file exists and contains valid project_id
3. Use dynamic container detection: `docker ps --filter "name=supabase_*_$PROJECT_ID"`
4. All Supabase containers follow naming: `supabase_[service]_$PROJECT_ID`

## Container Management

Expected container names:
- `supabase_db_$PROJECT_ID`
- `supabase_kong_$PROJECT_ID` 
- `supabase_auth_$PROJECT_ID`
- `supabase_edge_runtime_$PROJECT_ID`
- `supabase_studio_$PROJECT_ID`

## Script Template

```fish
#!/usr/bin/env fish
set PROJECT_ID (grep '^project_id' supabase/config.toml | cut -d'"' -f2)
if test -z "$PROJECT_ID"
    echo "Error: Could not determine project ID from supabase/config.toml"
    exit 1
end
# Use $PROJECT_ID in all operations
```

This ensures consistent Supabase local development across all project configurations.