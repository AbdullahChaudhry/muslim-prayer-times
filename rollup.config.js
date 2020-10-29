import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'iife',
      name: 'MuslimPrayerTimes',
      plugins: [
        terser({
          format: {
            comments: `/^[ A-Za-z]/`,
            beautify: true,
            indent_level: 2
          },
          compress: {
            defaults: false
          },
          mangle: false
        })
      ]
    },
    {
      file: 'dist/bundle.min.js',
      format: 'es',
      name: 'MuslimPrayerTimes',
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
    typescript()
  ]
}