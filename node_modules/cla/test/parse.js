
const cla = require('..');
const assert = require('assert');

describe('parse(command Command, args Array<string>) options Object', () => {
  const {parse, Alias, Command, Flag, Option, Type} = cla;

  it('should use process.argv when args are unspecified', () => {
    const oldArgv = process.argv;
    process.argv = ['@', '!', 'sh', 'these', 'are', 'argv', 'inputs'];
    const sh = Command({name: 'sh'});
    const {args} = parse(sh);
    assert.deepEqual(args, process.argv.slice(2));
    process.argv = oldArgv;
  });

  describe('expandArgs(root Command, args Array<string>) {path Array<Command>, args Array<Command|Option|string>}', () => {
    const {expandArgs} = parse;
    
    it('should expand an alias to a command', () => {
      const install = Command({name: 'install'});
      const i = Alias('i', install);
      const npm = Command({
        name: 'npm',
        aliases: [i],
        commands: [install]
      });

      const {args} = expandArgs(npm, ['i']);
      assert.deepEqual(args, [install]);
    });
    
    it('should expand an alias to an option', () => {
      const force = Option({
        name: '--force',
        key: 'force',
        type: Type.Empty(true)
      });

      const F = Alias('F', force);
      const rm = Command({
        name: 'rm',
        aliases: [F],
        options: [force]
      });
      const {args} = expandArgs(rm, ['F']);
      assert.deepEqual(args, [force]);
    });

    it('should expand aliases recursively', () => {
      const silent = Option({
        name: '--silent',
        key: 'silent',
        type: Type.Empty(true)
      });
      const s = Alias('s', silent);
      const ss = Alias('ss', s);
      const sss = Alias('sss', ss);
      const sh = Command({
        name: 'sh',
        aliases: [s, ss, sss],
        options: [silent]
      });
      const {args} = expandArgs(sh, ['sss']);
      assert.deepEqual(args, [silent]);
    });

    it('should ignore unknown options', () => {
      const sh = Command({
        name: 'sh'
      });

      const argv = ['--silent', '-F', 'i', 'install'];
      const {args} = expandArgs(sh, argv.slice(0));
      assert.deepEqual(args, argv);
    });

    it('should stop expanding at the double dash', () => {
      const force = Option({
        name: '--force',
        key: 'force',
        type: Type.Empty(true)
      });
      const F = Alias('F', force);
      const sh = Command({
        name: 'sh',
        aliases: [F],
        options: [force]
      });
      const argv = ['--', 'F'];
      const {args} = expandArgs(sh, argv.slice(0));
      assert.deepEqual(args, argv);
    });

    it('should split flag groups', () => {
      const name = Option({
        name: '--name',
        key: 'name',
        type: Type.String
      });
      const a = Flag('-a', [name, 'alyssa']);
      const b = Flag('-b', [name, 'bernie']);
      const c = Flag('-c', [name, 'curtis']);
      const sh = Command({
        name: 'sh',
        flags: [a,b,c],
        options: [name]
      });
      const {args} = expandArgs(sh, ['-abc']);
      assert.deepEqual(args, [name, 'alyssa', name, 'bernie', name, 'curtis']);
    });

    it('should decompose assigned flag arguments', () => {
      const name = Option({
        name: '--name',
        key: 'name',
        type: Type.String
      });
      const a = Flag('-a', [name, 'alyssa']);
      const n = Flag('-n', [name]);
      const sh = Command({
        name: 'sh',
        flags: [a, n],
        options: [name]
      });
      {
        const {args} = expandArgs(sh, ['-an=other']);
        assert.deepEqual(args, [name, 'alyssa', name, 'other']);
      }
      {
        const {args} = expandArgs(sh, ['-n=other']);
        assert.deepEqual(args, [name, 'other']);
      }
    });

    it('should decompose assigned option arguments', () => {
      const name = Option({
        name: '--name',
        key: 'name',
        type: Type.String
      });
      const sh = Command({
        name: 'sh', 
        options: [name]
      });
      const {args} = expandArgs(sh, ['--name=chris']);
      assert.deepEqual(args, [name, 'chris']);
    });
  });

  describe('expandOptions(path Array<Command>, args Array<Command|Option|String>) options Object', () => {
    const {expandOptions} = parse;

    it('should return option defaults if unspecified', () => {
      const name = Option({
        name: '--name',
        key: 'name',
        type: Type.String,
        defaultValue: 'chris'
      });
      const sh = Command({
        name: 'sh',
        options: [name]
      });
      const options = expandOptions([sh], []);
      assert.equal(options.name, 'chris');
    });

    it('should return option arguments if specified', () => {
      const name = Option({
        name: '--name',
        key: 'name',
        type: Type.String,
        defaultValue: 'chris'
      });
      const sh = Command({
        name: 'sh',
        options: [name]
      });
      const options = expandOptions([sh], [name, 'tyler']);
      assert.equal(options.name, 'tyler');
    });

    it('should stop parsing at the double dash', () => {
      const name = Option({
        name: '--name',
        key: 'name',
        type: Type.String
      });
      const sh = Command({
        name: 'sh',
        options: [name]
      });
      const options = expandOptions([sh], ['--', name, 'tyler']);
      assert.deepEqual(options.args, [name, 'tyler']);
    });
  });
});

