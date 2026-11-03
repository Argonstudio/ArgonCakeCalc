# Publish to GitHub and GitHub Pages

Documentation author: ChatGPT (OpenAI), with Ivan Voitkov.
Project author © 2026 Ivan Voitkov — https://github.com/Argonstudio/ArgonCakeCalc

## New repository

The repository is **Argonstudio/ArgonCakeCalc**. This package
does not log in to GitHub, create a repository or push changes on your behalf.

1. Create the empty GitHub repository `Argonstudio/ArgonCakeCalc` while signed in
   as its owner. Do not create competing README/license files through GitHub if
   you intend to push this prepared source tree as the first commit.
2. Unzip the source archive. Put its CONTENTS at the repository root, not inside
   a second nested project directory. Include `.github`, `.gitignore` and
   `.gitattributes`; file managers sometimes hide dotfiles.
3. Check notices, version, URLs, documentation and tests. Never upload a personal
   JSON backup, browser profile, node_modules or tests/output.
4. For a genuinely new local repository only:

```sh
git init -b main
git add .
git commit -m "Release ArgonCakeCalc 1.0.0"
git remote add origin https://github.com/Argonstudio/ArgonCakeCalc.git
git push -u origin main
```

If the remote already has history, clone it and integrate normally. Do not force
push or erase existing history just to follow these first-commit commands.
Authenticate with GitHub using your own preferred secure method; no credentials
belong in these files or documentation.

## Checks and Pages

The Test workflow installs development-only Playwright, runs calculation,
independent-oracle, build, language and browser tests. It does not publish recipes.
The separate Deploy Pages workflow checks generated outputs/calculations and
publishes the static site. The human owner must enable Actions and select
**Settings → Pages → Source: GitHub Actions**. Review workflow results before
announcing the release. A prepared workflow is not proof of a successful GitHub run.

The expected project-site URL after a successful enabled deployment is:
`https://argonstudio.github.io/ArgonCakeCalc/`.
Relative resource paths and SW scope support this subdirectory layout. Keep the
origin stable once users start storing databases. No server-side database or
secret API key is needed. GitHub's normal hosting limits/policies still apply.

## Release download

Create a tag `v1.0.0` and a GitHub Release after testing. Attach the source/static
ZIP and `ArgonCakeCalc.html` if convenient. The standalone HTML embeds source,
commercial license text, author/origin notices, attribution terms and font licensing information.
Keep LICENSE, NOTICE, ADDITIONAL_TERMS.md and third-party notices in source ZIPs.

Future edits require both build commands and both --check commands. Publish all
changed assets and generated sw.js together. Do not rely on a manually remembered
cache version. Installed copies prompt for activation; users should export JSON
before activating and before changing origin or standalone filename.
