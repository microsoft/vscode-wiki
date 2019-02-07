SystemJS.config({
  packages: {
    src: {
      defaultExtension: 'js'
    }
  },
  transpiler: 'plugin-babel',
  babelOptions: {
    presets: [
      'babel-preset-react'
    ]
  }
});
