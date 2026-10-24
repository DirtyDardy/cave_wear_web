#!/usr/bin/env bash
# Stop hook: runs when Claude finishes a task.
# If site files changed, test-build the site. A broken build goes back to Claude to fix.

input=$(cat)

# Claude is already fixing a failed build – let it stop (prevents an endless loop).
if echo "$input" | grep -q '"stop_hook_active": *true'; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR" || exit 0

# Only build when site files have uncommitted changes.
if [ -z "$(git status --porcelain -- src public astro.config.mjs package.json)" ]; then
  exit 0
fi

if ! output=$(npm run build 2>&1); then
  echo "The site build failed. Fix this before finishing:" >&2
  echo "$output" | tail -n 30 >&2
  exit 2
fi

exit 0
