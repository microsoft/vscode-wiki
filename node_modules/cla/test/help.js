
const assert = require('assert');
const help = require('../contrib/help');
const {parse, Alias, Command, Flag, Option, Type} = require('..');

function includes(str, substrings) {
  substrings.forEach((substring) => {
    assert(str.includes(substring), `Doc does not mention "${substring}".`);
  });
}

function discludes(str, substrings) {
  substrings.forEach(substring => {
    assert(!str.includes(substring), `Doc does mention "${substring}".`);
  });
}

describe('help(command Command, options Object) docs string?', () => {
  describe('*Command Overview*', () => {
    const save = Option({
      name: '--save',
      description: 'add packages to dependencies in package.json',
      key: 'dependency',
      type: Type.Empty(true)
    });
    const saveDev = Option({
      name: '--save-dev',
      description: 'add packages to devDependencies in package.json',
      key: 'devDependency',
      type: Type.Empty(true)
    });
    const S = Flag('-S', save);
    const D = Flag('-D', saveDev);

    const install = Command({
      name: 'install',
      description: 'install packages',
      flags: [S, D],
      options: [save, saveDev]
    });
    const i = Alias('i', install);

    const silent = Option({
      name: '--silent',
      description: 'supress warnings and logs',
      key: 'silent',
      type: Type.Empty(true)
    });
    const npm = Command({
      name: 'npm',
      description: 'node package manager',
      aliases: [i],
      options: [silent],
      commands: [install]
    });

    it('should return a command overview without arguments', () => {
      const options = parse(npm, [,,]);
      const npmDocs = help(npm, options);
      includes(npmDocs, [
        'npm',
        'i, install',
        '--silent'
      ]);
      discludes(npmDocs, [
        'ALIASES',
        'FLAGS'
      ]);
    });

    it('should work for subcommands as top-level commands', () => {
      const options = parse(npm, [,,]);
      const installDocs = help(install, options);
      includes(installDocs, [
        'install',
        '-S, --save',
        '-D, --save-dev'
      ]);
      discludes(installDocs, [
        'COMMANDS',
        'ALIASES',
        'FLAGS'
      ]);
    });
  });
});

