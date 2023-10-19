yarn install: Installs project dependencies based on the package.json file and generates a yarn.lock file.

yarn uninstall [package]


yarn add [package]: Adds a package to your project's dependencies and updates the package.json file.

yarn add [package] --dev: Adds a package to your project's devDependencies in the package.json file.

yarn remove [package]: Removes a package from your project's dependencies and updates the package.json file.

yarn upgrade: Upgrades all packages to their latest versions based on the version range specified in package.json.

yarn upgrade [package]: Upgrades a specific package to the latest version.

yarn upgrade-interactive: Interactively selects packages to upgrade with detailed information about available versions.

yarn list: Lists all installed packages and their versions.

yarn global add [package]: Installs a package globally (available system-wide).

yarn global list: Lists all globally installed packages.

yarn init: Interactively creates a new package.json file by prompting you for project details.

yarn run [script]: Executes a script defined in the scripts section of your package.json file.

yarn start: Runs the script defined as the "start" script in your package.json.

yarn test: Runs the script defined as the "test" script in your package.json.

yarn build: Builds your project according to the build script defined in your package.json.

yarn link: Creates a symbolic link from the global package to your project, useful for development.

yarn unlink: Removes the symbolic link created by yarn link.

yarn cache clean: Clears the Yarn cache, which can help resolve caching-related issues.

yarn why [package]: Displays information about why a package is installed, showing its dependency tree.

yarn info [package]: Retrieves information about a package, including its versions and metadata.