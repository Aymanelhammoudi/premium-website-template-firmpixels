#!/usr/bin/env bash
# Bouwt de site voor GitHub Pages (submap /<repo>/) en zet het resultaat op de branch gh-pages.
# Gebruik: bash scripts/deploy-pages.sh   (vanuit ayman-website/)
set -euo pipefail
REPO_NAME="premium-website-template-firmpixels"
OWNER="aymanelhammoudi"
export NEXT_PUBLIC_BASE_PATH="/${REPO_NAME}"
export NEXT_PUBLIC_SITE_URL="https://${OWNER}.github.io/${REPO_NAME}"

npm run build
touch out/.nojekyll   # anders negeert GitHub Pages de map _next

ROOT="$(git rev-parse --show-toplevel)"
WORK="$(mktemp -d)"
git -C "$ROOT" worktree add --detach "$WORK" >/dev/null
(
  cd "$WORK"
  git checkout --orphan gh-pages-tmp >/dev/null 2>&1
  git rm -rfq . >/dev/null 2>&1 || true
  cp -R "$ROOT/ayman-website/out/." .
  git add -A
  git commit -qm "Publiceer site op GitHub Pages"
  git push -f origin HEAD:gh-pages
)
git -C "$ROOT" worktree remove --force "$WORK"
git -C "$ROOT" branch -D gh-pages-tmp >/dev/null 2>&1 || true
echo "Klaar: https://${OWNER}.github.io/${REPO_NAME}/"
