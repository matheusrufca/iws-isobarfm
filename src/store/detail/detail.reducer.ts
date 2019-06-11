import { createReducer } from 'deox';
import { DeepImmutableObject } from 'deox/dist/types';
import { DetailState } from './detail-state';
import { detailActions } from './detail.actions';

const initialState: Readonly<DetailState> = {
	// albums: [],
	// artist: null,
	artistId: '',
	isLoading: false,
	resources: {
		albums: null,
		artist: null
	}
};

export const detailReducer = createReducer(initialState, (handleAction) => [
	handleAction(detailActions.loadDetail, (state, action) => ({
		...state,
		resources: {
			artist: null,
			albums: null
		},
		artistId: action.payload.artistId ? action.payload.artistId : '',
		isLoading: false
	})),
	handleAction(detailActions.fetchData, (state) => ({
		...state,
		isLoading: true
	})),
	handleAction(detailActions.fetchDataSuccessful, (state, action: any) => ({
		...state,
		isLoading: false,
		resources: {
			...state.resources,
			albums: {
				data: action.payload.albums
					? action.payload.albums
					: state.resources.albums
					? state.resources.albums.data
					: null,
				error: false,
				errorData: null
			},
			artist: {
				data: action.payload.artist
					? action.payload.artist
					: state.resources.artist
					? state.resources.artist.data
					: null,
				error: false,
				errorData: null
			}
		}
	})),
	handleAction(detailActions.fetchDataFailure, (state, action: any) => ({
		...state,
		isLoading: false,
		resources: {
			...state.resources,
			albums: {
				data: state.resources.albums ? state.resources.albums.data : null,
				error: false,
				errorData: action.payload.albums
			},
			artist: {
				data: state.resources.artist ? state.resources.artist.data : null,
				error: true,
				errorData: action.payload.artist
			}
		}
	}))
]);
