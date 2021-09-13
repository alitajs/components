import 'zx/globals';

(async () => {
  const root = path.join(__dirname, '..');
  const pkgDir = path.join(root, 'packages');
  const pkgs = await fs.readdir(pkgDir);

  for (const pkg of pkgs) {
    if (pkg.charAt(0) === '.') continue;
    if (!(await fs.stat(path.join(pkgDir, pkg))).isDirectory()) continue;
    await bootstrapPkg({
      pkgDir,
      pkg,
      force: argv.force,
    });
  }

  function getName(pkgName: string) {
    return `@alita/${pkgName}`;
  }

  function getVersion() {
    return require('../package.json').version;
  }

  async function bootstrapPkg(opts: any) {
    const pkgDir = path.join(opts.pkgDir, opts.pkg);
    if (!opts.force && fs.existsSync(path.join(pkgDir, 'package.json'))) {
      console.log(`${opts.pkg} exists`);
    } else {
      const name = getName(opts.pkg);

      // package.json
      const pkgPkgJSONPath = path.join(pkgDir, 'package.json');
      const hasPkgJSON = fs.existsSync(pkgPkgJSONPath);
      const pkgPkgJSON = hasPkgJSON ? require(pkgPkgJSONPath) : {};
      fs.writeJSONSync(
        pkgPkgJSONPath,
        Object.assign(
          {
            name,
            version: getVersion(),
            description: name,
            main: 'dist/index.js',
            module: 'dist/index.esm.js',
            types: 'dist/src/index.d.ts',
            typings: 'dist/src/index.d.ts',
            files: ['dist'],
            scripts: {
              build: 'father-build',
              watch: 'father-build -w',
            },
            repository: {
              type: 'git',
              url: 'https://github.com/alitajs/components',
            },
            authors: ['xiaohuoni <xiaohuoni@gmail.com> (https://github.com/xiaohuoni)'],
            license: 'MIT',
            bugs: 'https://github.com/alitajs/components/issues',
            homepage: `https://github.com/alitajs/components/tree/master/packages/${opts.pkg}#readme`,
            publishConfig: {
              access: 'public',
            },
          },
          {
            ...(hasPkgJSON
              ? {
                  authors: pkgPkgJSON.authors,
                  bin: pkgPkgJSON.bin,
                  files: pkgPkgJSON.files,
                  scripts: pkgPkgJSON.scripts,
                  description: pkgPkgJSON.description,
                  dependencies: pkgPkgJSON.dependencies,
                  devDependencies: pkgPkgJSON.devDependencies,
                  compiledConfig: pkgPkgJSON.compiledConfig,
                }
              : {}),
          },
        ),
        { spaces: '  ' },
      );

      // README.md
      await fs.writeFile(
        path.join(pkgDir, 'README.md'),
        `# ${name}\n\nSee our website [alitajs](https://www.alitajs.com) for more information.`,
        'utf-8',
      );

      // tsconfig.json
      await fs.writeFile(
        path.join(pkgDir, 'tsconfig.json'),
        `{
"extends": "../../tsconfig.json",
"include": ["./src"]
}\n`,
        'utf-8',
      );

      // src/index.ts
      const srcDir = path.join(pkgDir, 'src');
      if (!fs.existsSync(srcDir)) {
        await $`mkdir ${srcDir}`;
      }
      if (!fs.existsSync(path.join(pkgDir, 'src', 'index.ts'))) {
        await fs.writeFile(
          path.join(pkgDir, 'src', 'index.ts'),
          `
export default () => {
  return '${name}';
};\n`.trimLeft(),
          'utf-8',
        );
        await fs.writeFile(
          path.join(pkgDir, 'src', 'index.test.ts'),
          `
import index from './index';

test('normal', () => {
  expect(index()).toEqual('${name}');
});\n`.trimLeft(),
          'utf-8',
        );
      }

      console.log(chalk.green(`${opts.pkg} bootstrapped`));
    }
  }
})();
