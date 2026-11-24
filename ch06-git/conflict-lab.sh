#!/usr/bin/env bash
# CH6 · Merge-conflict practice. Creates a throw-away repo in ./conflict-practice
# Run in Git Bash (Windows), Terminal (macOS) or Linux:   bash conflict-lab.sh
set -e
rm -rf conflict-practice
mkdir conflict-practice && cd conflict-practice
git init -q -b main
git config user.name  "Practice Bot"
git config user.email "practice@example.com"

mkdir -p views/partials
cat > views/partials/nav.ejs <<'NAV'
<nav class="flex gap-4">
  <a href="/">Home</a>
  <a href="/items">Items</a>
</nav>
NAV
git add . && git commit -qm "Add nav partial"

# teammate A renames the link on a feature branch
git switch -qc feature/nav-rename
sed -i.bak 's#>Items<#>Shop<#' views/partials/nav.ejs && rm -f views/partials/nav.ejs.bak
git commit -qam "Rename Items link to Shop"

# meanwhile main changes the SAME line
git switch -q main
sed -i.bak 's#>Items<#>Products<#' views/partials/nav.ejs && rm -f views/partials/nav.ejs.bak
git commit -qam "Rename Items link to Products"

echo "Repo ready in ./conflict-practice. Now run:"
echo "  cd conflict-practice"
echo "  git merge feature/nav-rename      # → CONFLICT"
echo "  git status                        # nav.ejs: both modified"
echo "  code views/partials/nav.ejs       # choose, delete <<< === >>>"
echo "  git add views/partials/nav.ejs && git commit"
echo "  git log --oneline --graph --all"
