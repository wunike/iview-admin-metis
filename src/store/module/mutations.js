export default {
	updateShowErrorStatus(state, payload) {
		state.showError = payload.showError;
	},
	updateLoadingStatus(state, payload) {
		state.isLoading = payload.isLoading;
		if (typeof payload.loadingBg!=='undefined') {
			state.loadingBg = payload.loadingBg;
		}
	},
	updateUserInfo(state,payload){
		state.userInfo = payload.userInfo;
	},
	updateToken(state,payload){
		state.token = payload.token;
	},
	updateTenant(state,payload){
		state.tenant = payload.tenant;
	},
	updateLogoUrlLight(state,payload){
		state.logoUrlLight = payload.logoUrlLight;
	},
	updateLogoUrl(state,payload){
		state.logoUrl = payload.logoUrl;
	},
	updateMiniLogoUrl(state,payload){
		state.miniLogoUrl = payload.miniLogoUrl;
	},
	updateCalendarConfig(state,payload){
		state.calendarConfig = payload.calendarConfig;
	},
	updateAsideApp(state,payload){
		state.asideApp = payload.asideApp;
	},
	updateCurrentAside(state,payload){
		state.currentAsideApp = payload.currentAsideApp;
	},
	appMenuList(state,payload){
		state.appMenuList = payload.appMenuList;
	},
	updatePid(state,{pid}){
		state.pid = pid;
	},
	updateButtonPerm(state,payload){
		state.buttonPerm = payload.buttonPerm;
	},
};
