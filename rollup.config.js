import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/main.ts',
  output: [
    // {
    //   file: 'public/build/main-bundle.js',
    //   format: 'iife',
    //   name: 'MuslimPrayerTimes',
    //   plugins: [
    //     terser({
    //       format: {
    //         comments: `/^[ A-Za-z]/`,
    //         beautify: true,
    //         indent_level: 2
    //       },
    //       compress: {
    //         defaults: false
    //       },
    //       mangle: false
    //     })
    //   ]
    // },
    {
      format: 'iife',
      name: 'MuslimPrayerTimes',
      file: 'public/build/main.js',
      plugins: [
        terser({
          format: {
            comments: false
          }
        })
      ]
    }
  ],
  plugins: [
    typescript(),
    nodeResolve()
  ]
}