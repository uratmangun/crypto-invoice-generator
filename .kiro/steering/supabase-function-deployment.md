---
inclusion: fileMatch
fileMatchPattern: ['supabase/functions/**/*', '**/supabase/**/*']
---

# Supabase Edge Functions Deployment

## Core Deployment Rules

**Always deploy Edge Functions directly to the local container using Docker commands.**

### Required Pre-Deployment Steps

1. **Get project configuration dynamically**:
   ```fish
   set PROJECT_ID (grep '^project_id' supabase/config.toml | cut -d'"' -f2)
   set CONTAINER_ID (docker ps --filter "name=supabase_edge_runtime_$PROJECT_ID" --format "{{.ID}}")
   ```

2. **Verify container is running**:
   ```fish
   if test -z "$CONTAINER_ID"
       echo "Error: Edge Functions container not found"
       exit 1
   end
   ```

### Standard Deployment Pattern

```fish
# Deploy function changes
docker cp supabase/functions/[function-name] $CONTAINER_ID:/functions/
docker restart $CONTAINER_ID
```

### Function Structure Requirements

- `index.ts` - Main function file with `serve()` export
- `deno.json` - Required Deno configuration
- Proper TypeScript/JavaScript syntax for Deno runtime

### Authorization Pattern

All function calls require authorization header:
```
Authorization: Bearer [VITE_SUPABASE_ANON_KEY]
```

### Deployment Workflow

1. **Existing Functions**: Use `docker cp` + `docker restart` pattern
2. **New Functions**: After docker deployment, restart full stack:
   ```fish
   bunx supabase stop
   bunx supabase start
   ```
3. **Test endpoint**: `http://127.0.0.1:54321/functions/v1/[function-name]`

### Troubleshooting

- **404 errors**: Function not loaded - restart Supabase stack
- **Container issues**: Check logs with `docker logs $CONTAINER_ID --tail 10`
- **File structure**: Verify with `docker exec $CONTAINER_ID ls -la /functions/`

### Critical Rules

- **Never use** `supabase functions deploy` for local development
- **Always restart container** after copying function files
- **Full stack restart** only for brand new functions
- **Dynamic project ID detection** from `supabase/config.toml`