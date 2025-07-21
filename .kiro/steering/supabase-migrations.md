---
inclusion: fileMatch
fileMatchPattern: ['supabase/migrations/**/*.sql', 'supabase/config.toml']
---

# Supabase Migration Standards

## Migration Execution Rules

Apply migrations directly to PostgreSQL using Docker containers. Never use `supabase db push` or CLI migration commands.

### Required Pre-Migration Steps

1. **Read project ID** from `supabase/config.toml`
2. **Detect PostgreSQL container** using project ID
3. **Verify container is running** before applying migrations

### Standard Migration Pattern

```fish
# Get project configuration
set PROJECT_ID (grep '^project_id' supabase/config.toml | cut -d'"' -f2)
set CONTAINER_ID (docker ps --filter "name=supabase_db_$PROJECT_ID" --format "{{.ID}}")

# Verify container exists
if test -z "$CONTAINER_ID"
    echo "Error: PostgreSQL container not found for project $PROJECT_ID"
    exit 1
end

# Apply migration
cat supabase/migrations/[migration-file].sql | docker exec -i $CONTAINER_ID psql -U postgres -d postgres
```

### Migration Workflow

- **Immediate Application**: Apply migrations immediately after creation/modification
- **Chronological Order**: Apply pending migrations by filename timestamp
- **Direct Database Access**: Use `docker exec -i` to pipe SQL directly to PostgreSQL
- **Connection Details**: Database `postgres`, user `postgres`

### Container Detection

- **Project ID Source**: `supabase/config.toml` (never hardcode)
- **Container Pattern**: `supabase_db_[PROJECT_ID]`
- **Dynamic Detection**: Use `docker ps --filter` with project ID

This ensures database schema stays synchronized with migration files without manual intervention.