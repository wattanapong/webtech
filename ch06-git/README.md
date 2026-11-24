# CH6 · Software Collaboration Tool: Git & GitHub (Week 9)

Slides: **CH6 - Software Collaboration Tool (Git and GitHub)** (from the lecturer; not in this repo)

> **Tip for the course:** you need Git from Week 1 to pull this repository. Part A below is the minimum to learn on day 1.

## Part A · Using this course repository (Week 1)

```bash
git clone https://github.com/wattanapong/webtech.git
cd webtech
git pull                # every week, to get new examples
```

**Rule: never edit the course files directly.** If you change them, your next `git pull` may conflict.
Copy a folder into `my-work/`, which Git ignores, and practise there:

```bash
mkdir -p my-work
cp -r ch04-2-js-client/lab-starter my-work/lab4        # Windows PowerShell: Copy-Item -Recurse
```

Did you edit a course file by mistake? Keep your work aside, then pull:

```bash
git stash          # put your changes on a stack
git pull --rebase
git stash pop      # bring them back (fix conflicts if any)
```
Or throw your changes away: `git restore .`

## Part B · Solo practice

```bash
git config --global user.name  "Somchai Jaidee"
git config --global user.email "you@up.ac.th"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"

mkdir myshop && cd myshop && git init
echo "# MyShop" > README.md
git status                       # untracked (red)
git add README.md && git status  # staged (green)
git commit -m "Add README"
git switch -c feature/login      # branch
echo "<h1>Login</h1>" > login.html
git add . && git commit -m "Add login page"
git switch main && git merge feature/login
git log --oneline --graph --all
```

Undo safely: `git restore <file>`, `git restore --staged <file>`, `git commit --amend` (only before pushing), `git revert <hash>`.

## Part C · Merge-conflict practice

```bash
cd ch06-git
bash conflict-lab.sh             # creates ./conflict-practice with a ready-made conflict
```
Follow the printed steps. In VS Code, use **Accept Current / Incoming / Both**, then `git add` and `git commit`.

## Part D · Lab 9A: group repository + first pull request

1. The lead creates a **private** repo `226297-sec<N>-group<NN>` with a README and a Node `.gitignore` (copy `templates/gitignore-node.txt`).
2. The lead adds the 4 teammates and **wattanapong.su@outlook.com** as collaborators.
3. Everyone logs in (`gh auth login` or an SSH key) and clones the repo.
4. `git switch -c docs/<your-name>`, then add your ID, name and role to `README.md` (start from `templates/README-group.md`).
5. `git push -u origin docs/<your-name>`, then open a PR (`gh pr create --fill`).
6. A teammate reviews and merges. The lead creates one Issue per page.

Also in `templates/`: `.github/pull_request_template.md`. Copy it into your group repo so every PR has the review checklist.

## Self-check

- [ ] I can explain the working tree → staging area → local repo → remote
- [ ] I solved the conflict in `conflict-practice` without deleting anyone's work
- [ ] My group has 5 merged PRs, one per member
- [ ] `.env` and `node_modules/` are not in our repo
