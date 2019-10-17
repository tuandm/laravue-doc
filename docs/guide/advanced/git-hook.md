# Git Hooks
Experiened developers will always keep following coding standards on their mind while working. But new developers only focus on the requirements and usually forget coding rules. Code Linting (Lint) is every important to ensure coding conventions consistency.

What are the beneifts of using Lint?
- Fewer bugs
- With higher development efficiency, Lint can easily find low-level, obvious errors.
- Improve code quality
- Readability and consistency

Before, `lint` check was a part of CI (Continuous Integration):

> Push Code --> Run CI find problem(remote) --> Fix in local --> Push Again --> Pass CI(remote)

But there is a problem with this setup. Our `CI` (continuous integration) often doesn't just do `Lint` work, it also has many other tasks, which leads to a special waste of time. Our CI usually threw syntax errors from `lint` check after runnng other heavy tasks which took minutes. Obvously this working model is not too effective.

By asking git hooks processing `lint` check before push, we will save lot of time for CI processing which is super expensive. There are some useful tools to do this, like [husky](https://github.com/typicode/husky) or [pre-commit](https://github.com/observing/pre-commit). Laravue uses `husky`.

## husky

```bash
yarn install husky -D -S
```

Then modify package.json to add configuration:

```json
{
  "scripts": {
    "precommit": "eslint resources/**/*.js"
  }
}
```

Finally try Git commit and you will receive feedback soon:

```
git commit -m "Keep calm and commit"
```

By applying `husky` on git hooks, we can run eslint everytime we use git commands (commit, push). But the problem is that we only need to check the changes only while this command will check all js files under `resources` which contains all source code from other developers and those files are almost fine (because we apply `husky` when project started). To resolve this prolem - we use `lint-staged`.

## lint-staged

To solve the above pain points, you need to use [lint-staged](https://github.com/okonet/lint-staged). It will only check the parts that you submitted or you modified.

```bash
yarn install lint-staged -D -S
```

Then, modify the package.json configuration:

```json
"precommit": "lint-staged"

"lint-staged": {
    "resources/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  }
```

With above configurtion, system will verify the code you submitted matches the `eslint` ([ESLint](coding-convention.md#javascript-vue-eslint)) rules, before your local `commit` executes. If it is passed, it will continue with `git commit` normally, else, it will execute `eslint --fix` to try fixing it automatically. If the repair is successful, it continues summitting the repaired code or . If the repair can not be done, it will prompt you about the errors, and you have to fix them yourself and run `git commit` again.

## Conclution

The best `lint` specification process is to recommend team members to configure `eslint` in their own editors, configure and enable the `eslint-loader` error in webpack, so the editors can help developers fixing some simple formatting errors, reminding them of some places that don't meet the `lint` specification and prompt them for errors on the command line. See the details [ESLint](coding-convention.md#javascript-vue-eslint).

But this is not mandatory. Some team members or newly arrived interns haven't configured the editors or ignore the errors in the command line. In this case, you need to configure to execute `eslint` on `precommit` hook to ensure all code submitted to the remote repository is aligned with coding standards.
