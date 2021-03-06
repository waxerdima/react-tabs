const exec = require('./exec');
const pkg = require('../package.json');
const currentVersion = pkg.version;
const branchName = exec('git rev-parse --abbrev-ref HEAD', true);
const semver = require('semver');
const readline = require('readline');
const stdin = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function syncRemote(branchName, nextVersion) {
  exec(`git push origin ${branchName}`);
  exec(`git push --tags`);
}

function exitFailure(message) {
  console.error(message);
  process.exit(1);
}

if (branchName === 'master') {

  console.log('On master branch, check!');

  stdin.question(`Next version (current is ${currentVersion})? `, (nextVersion) => {

    if (!semver.valid(nextVersion)) {
      exitFailure(`Version '${nextVersion}' is not valid: it must be a valid semantic version. See http://semver.org/.`);
    }

    if (!semver.gt(nextVersion, currentVersion)) {
      exitFailure(`Version '${nextVersion}' is not valid: it must be greater than the current version.`);
    }

    if (nextVersion.startsWith('v')) {
      nextVersion = nextVersion.slice(1);
    }
    // Ensure the build is generated
    exec('npm run build');

    console.log(`npm version ${nextVersion}`);

    // Locally commit the version update in package.json (also, if present, npm-shrinkwrap.json) and create tag
    exec(`npm version ${nextVersion}`);

    syncRemote(branchName, nextVersion);

    exec('npm publish');

    stdin.close();
  });

}
