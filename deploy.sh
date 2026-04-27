#!/usr/bin/env bash
set -euo pipefail

REMOTE="origin"
TARGET_BRANCH="main"

cd "$(dirname "$0")"

if [ $# -lt 1 ]; then
  echo "Usage: ./deploy.sh \"commit message\""
  echo "       npm run deploy -- \"commit message\""
  exit 1
fi

MSG="$1"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: not inside a git repository."
  exit 1
fi

UNTRACKED=$(git ls-files --others --exclude-standard)
if git diff --quiet && git diff --cached --quiet && [ -z "$UNTRACKED" ]; then
  echo "No changes to commit."
else
  git add -A
  git status --short
  git commit -m "$MSG"
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
LOCAL_SHA=$(git rev-parse HEAD)
REMOTE_SHA=$(git ls-remote "$REMOTE" "refs/heads/$TARGET_BRANCH" | awk '{print $1}')

if [ "$LOCAL_SHA" = "$REMOTE_SHA" ]; then
  echo "$REMOTE/$TARGET_BRANCH already at $LOCAL_SHA. Nothing to push."
  exit 0
fi

if [ "$CURRENT_BRANCH" = "$TARGET_BRANCH" ]; then
  git push "$REMOTE" "$TARGET_BRANCH"
else
  echo "Pushing $CURRENT_BRANCH -> $REMOTE/$TARGET_BRANCH"
  git push "$REMOTE" "HEAD:$TARGET_BRANCH"
fi

echo "Deployed $LOCAL_SHA to $REMOTE/$TARGET_BRANCH"
