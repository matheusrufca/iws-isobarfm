const apiDomain = 'https://iws-recruiting-bands.herokuapp.com';
const apiBaseURL = `${apiDomain}/api`;

const Defaults = {
	appName: 'isobarfm',
	domain: apiDomain,
	defaultLocale: {
		lang: 'en'
	},
	app: {
		platforms: ['ios', 'android']
	},
	apis: {
		baseUrl: apiBaseURL,
		public: {
			base: apiBaseURL,
			backend: apiBaseURL
		},
		bands: {
      base: `${apiBaseURL}`,      
			bands: `${apiBaseURL}/bands`,
			albums: `${apiBaseURL}/albums`
		}
	}
};

export default Defaults;
