# Contributing to Part-up's mobile app

This guideline details the preferred way of making contributions to the part-up mobile app codebase.

## Git

### Branches
- `develop`: the main integration branch. All code committed to `develop` should be ready for a release branch.
- `master`: points to the latest git commit that is deployed to production
- `MD*.*.*`: points to a release branch, only fixes for that release should be pushed to that branch
- all other branches are considered feature/fix branches

### Featurebranches
- Always create a feature branch with a descriptive name (e.g., `git checkout -b feat-notifications`) when developing features. Push new commits to your branch only
- Keep your branch up to date with the latest commits on the develop branch by occassionally merging in changes `git merge develop`
- When you are finished with your functionality, rebase the branch onto the latest commit of `develop` using the command `git rebase origin/develop` and create a pull request.
- When an integrator is satisfied with the branch and all feedback is processed, the integrator merges the featurebranch into `develop` using `git merge --no-ff feat-notifications`.

### Commit message format
The git commit message standard is based on [Angular's commit message standard](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md).

The format includes **type**, a **scope** and a **subject**:
```
type(scope): description in present tense
```

e.g. "feat(notifications): add supporter notification"

The type could be one of the following:
- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation only changes.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **perf**: A code change that improves performance.
- **test**: Adding missing tests.
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation.

#### Scope
The scope could be anything specifying context of the commit change. For example `notifications`, `dropdown`, `partupdetail`, etc.

#### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

## Code

### Stack
- React (JSX syntax) as rendering library
- React Router as client-side router
- ES2015 (Meteor's implementation of it)
- Sass

### Directory structure
    ├── client
    │   ├── link.jsx
    │   ├── main.html
    │   └── stylesheets
    │       ├── components
    │       │   ├── body.sass
    │       │   └── partups.sass
    │       ├── main.scss
    │       ├── reset.css -> ../../node_modules/reset.css/reset.css
    │       └── variables
    │           └── colors.sass
    ├── imports
    │   ├── Api.js
    │   ├── Debug.js
    │   ├── Router.jsx
    │   ├── classes
    │   │   ├── Model.js
    │   │   └── QueryBuilder.js
    │   ├── components
    │   │   └── Partups.jsx
    │   ├── containers
    │   │   └── PartupsContainer.jsx
    │   ├── helpers
    │   │   ├── classNames.js
    │   │   └── linkCollection.js
    │   └── models
    │       ├── PartupModel.js
    │       └── UserModel.js
    └── package.json
