# Contributing to imager

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved.

## Table of Contents

- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
- [Styleguides](#styleguides)
  - [Commit Messages](#commit-messages)
  - [Code Style](#code-style)

## I Have a Question

> If you want to ask a question, we assume that you have read the available [Documentation](README.md).

Before you ask a question, it is best to search for existing [Issues](https://github.com/zeMinng/imager/issues) that might help you. In case you've found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/zeMinng/imager/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

## I Want To Contribute

### Reporting Bugs

An effective bug report helped us fix the issue and make the tool better for everyone.

**Before Submitting a Bug Report:**

1.  **Search** the [issue tracker](https://github.com/zeMinng/imager/issues) to see if the bug has already been reported.
2.  **Reproduce** the issue. Can you reproduce it reliably?

**How to Submit a Good Bug Report:**

- Use the **Bug Report Template** provided.
- **Title**: Use a clear and descriptive title.
- **Description**: Describe the behavior you expected vs. what actually happened.
- **Steps to Reproduce**: Provide a step-by-step guide to reproduce the issue.
- **Screenshots/Video**: If applicable, add screenshots or screen recordings.
- **Environment**: OS, Browser version, etc.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for imager, **including completely new features and minor improvements to existing functionality**.

- Use the **Feature Request Template** provided.
- **Title**: Use a clear and descriptive title.
- **Description**: Provide a step-by-step description of the suggested enhancement in as much detail as possible.
- **Why**: Explain why this enhancement would be useful to most imager users.

### Your First Code Contribution

1.  **Fork** the repository on GitHub.
2.  **Clone** your fork locally:
    ```bash
    git clone https://github.com/your-username/imager.git
    cd imager
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Create a branch** for your changes:
    ```bash
    git checkout -b feat/my-new-feature
    # or
    git checkout -b fix/my-bug-fix
    ```
5.  **Make your changes**.
6.  **Run checks** to ensure quality:
    ```bash
    npm run lint
    npm run build
    ```
7.  **Commit** your changes following our [Commit Messages](#commit-messages) convention.
8.  **Push** to your fork:
    ```bash
    git push origin feat/my-new-feature
    ```
9.  **Open a Pull Request** on the main repository.

## Styleguides

### Commit Messages

We encourage the use of [Conventional Commits](https://www.conventionalcommits.org/).

Format: `<type>(<scope>): <subject>`

Common types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

Example: `feat(stitcher): add support for drag and drop`

### Code Style

- **TypeScript**: We use strict TypeScript. Ensure no `any` types unless absolutely necessary.
- **Linting**: We use `oxlint` for code and `stylelint` for styles.
  - Run `npm run lint` to check everything.
  - Run `npm run lint:fix` to automatically fix issues.
- **Formatting**: We use `oxfmt`.
  - Run `npm run fmt` to format your code.
