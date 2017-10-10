import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

export default {
	entry: 'src/index.js',
	dest: 'public/dist/js/bundle.js',
	format: 'iife',
	sourceMap: true,
	plugins: [
		nodeResolve({
			jsnext: true
		}),
		commonjs(),
		json({
			include: 'node_modules/**'
		})
	]
}
