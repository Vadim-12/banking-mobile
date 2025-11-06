module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'expo-router/babel',
			[
				'module-resolver',
				{
					root: ['./'],
					alias: { '@': './src', '@/app': './app' },
					extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
				},
			],
		],
	};
};
