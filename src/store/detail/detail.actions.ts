import { createActionCreator } from 'deox';
import { ErrorInfo } from '../../core/interfaces/error';
import { Album } from '../../core/models/album';
import { Artist } from '../../core/models/artist';

const loadDetail = createActionCreator(
	'[Detail] LOAD_DETAIL',
	(resolve) => (
		payload: { componentId: string; artistId: string },
		meta?: object
	) => resolve(payload, meta ? meta : {})
);

const fetchData = createActionCreator(
	'[Detail] FETCH_DATA',
	(resolve) => (payload: string, meta?: object) =>
		resolve(payload, meta ? meta : {})
);
const fetchDataSuccessful = createActionCreator(
	'[Detail] FETCH_DATA_SUCCESSFUL',
	(resolve) => (
		payload: {
			artist?: Artist;
			albums?: Album[];
		},
		meta?: object
	) => resolve(payload, meta ? meta : {})
);

const fetchDataFailure = createActionCreator(
	'[Detail] FETCH_DATA_FAILURE',
	(resolve) => (
		payload: {
			artist?: ErrorInfo;
			albums?: ErrorInfo;
		},
		meta?: object
	) =>
		resolve(
			payload,
			meta ? Object.assign(meta, { error: true }) : { error: true }
		)
);

export type DetailsActions =
	| ReturnType<typeof loadDetail>
	| ReturnType<typeof fetchData>
	| ReturnType<typeof fetchDataSuccessful>
	| ReturnType<typeof fetchDataFailure>;

export const detailActions = Object.freeze({
	loadDetail,
	fetchData,
	fetchDataFailure,
	fetchDataSuccessful
});
