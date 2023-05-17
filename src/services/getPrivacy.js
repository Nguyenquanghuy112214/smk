import * as request from '~/utils/request';

export const getprivacy = async () => {
	try {
		const res = await request.getAll('PrivacyPolicy/Privacy', {
			params: {},
		});
		return res;
	} catch (error) {
		// localStorage.clear();
		// return window.location.href = config.routes.login
	}
};
