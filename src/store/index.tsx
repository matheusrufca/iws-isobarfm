import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { detailEpics } from './detail/detail.epic';
import { detailReducer } from './detail/detail.reducer';
import { overviewEpics } from './overview/overview.epic';
import { overviewReducer } from './overview/overview.reducer';
import { rootStateActions } from './root-state.actions';

const epicMiddlware = createEpicMiddleware({
	dependencies: {}
});

const store = configureStore();

export function configureStore() {
	let middlewares;

	middlewares = [epicMiddlware];

	if (__DEV__) {
		const loggerMiddleware = createLogger();
		middlewares = [...middlewares, loggerMiddleware];
	}
	const store = createStore(
		combineReducers({
			detail: detailReducer,
			overview: overviewReducer
		}),
		applyMiddleware(epicMiddlware)
	);

	epicMiddlware.run(
		combineEpics(
			overviewEpics.appInit,
			overviewEpics.updateArtists,
			overviewEpics.navigateToDetail,
			detailEpics.appInit,
			detailEpics.loadDetail
		)
	);

	store.dispatch(rootStateActions.applicationLoaded());

	return store;
}

export const getStore = () => {
	return store;
};
