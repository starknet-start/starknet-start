## How to contribute to Starknet React

#### **Did you find a bug?**

* **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/starknet-start/starknet-start/issues).
* If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/starknet-start/starknet-start/issues/new). Be sure to include a**title and clear description**, as much relevant information as possible, and a**code sample** or an**executable test case** demonstrating the expected behavior that is not occurring.

#### **Did you write a patch that fixes a bug?**

* Open a new GitHub pull request with the patch.
* Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.
* Make sure your patch applies cleanly to the `main` branch. It's a good idea to `git rebase main` before opening the Pull Request.
* The commit style used by Starknet React follows this pattern: `<package>: <commit message>`. For example, `core: change useAccount hook to...`.

#### **Did you fix whitespace, format code, or make a purely cosmetic patch?**

Changes that are cosmetic in nature and do not add anything substantial to the stability, functionality, or testability of Starknet React will generally not be accepted.

#### **Do you have questions about the source code?**

* Ask any question about how to use Starknet React [in the Discord community](https://discord.gg/m7B92CNFNt).

#### **Do you want to contribute to the Starknet React documentation?**

* For small changes feel free to open a GitHub pull request with the patch.
* For larger changes, please discuss the changes with the team before working on it.

---

### Installation Guide

NOTICE: there's an issue with vocs on Windows. Please use the Windows Linux Subsystem (WSL) for now.

The project is a standard [turbo](https://turbo.build/repo/docs) repo, you will find all `starknet-start` packages in the `packages` directory.

Clone this repository

```
git clone git@github.com:starknet-start/starknet-start.git
```

Install the dependencies

```
pnpm install
```

---

### Testing

We use vitest for writing tests.

For running tests you need to setup a local testnet with docker by running the below command.

```
docker run --rm -p 5050:5050 shardlabs/starknet-devnet-rs:0.7.0-seed0
```

Then start tests

```
pnpm test
```

---

### Documentation and Demo

If you want to test something in browser, you can create a demo or experiment with existing demos in documentation. You can find demo components inside `docs/components/demo` directory.

For documentation we are using [Vocs](https://vocs.dev/)

To start docs website you can run

```
pnpm dev
```

---

### Coding Conventions

The project is preconfigured with [Biome](https://biomejs.dev/) for formatting and linting. So you should install biome extension for your code editor and make it default formatter for the project.

Before opening a PR make sure to run the following commands.

```
pnpm lint:fix
pnpm format
```

---

Thanks! ❤️ ❤️ ❤️

The Starknet React team
