// tslint:disable-next-line: import-name
import _ from 'lodash';
import { compose, filter, orderBy } from 'lodash/fp';
import { Artist } from '../../core/models/artist';
import { SortingTypes } from '../../core/models/sorting-types.enum';
import { Nullable } from '../../core/models/types';
import { ErrorInfo } from './../../core/interfaces/error';
import { OverviewState } from './overview-state';

export const selectArtists = (state: OverviewState): Artist[] => {
	if (!(state.resources.artists && state.resources.artists.data)) return [];

	return filterAndSortArtists(state.query, state.sortType)(
		_,
		state.resources.artists.data
	);
};

export const selectIsLoading = (state: OverviewState): boolean =>
	state.isLoading;

export const selectError = (state: OverviewState): Nullable<ErrorInfo> =>
	state.resources && state.resources.artists && state.resources.artists.error
		? state.resources.artists.errorData
		: null;

function filterAndSortArtists(query: string, sortSettings: SortingTypes) {
	return compose(
		filterArtistList(query),
		sortArtistList(sortSettings)
	);
}

function sortArtistList(sortType: SortingTypes = SortingTypes.Alphabetically) {
	const identity =
		sortType === SortingTypes.Alphabetically
			? [SortingTypes.Alphabetically, SortingTypes.Popularity]
			: [SortingTypes.Popularity, SortingTypes.Alphabetically];

	// const order: (boolean | 'asc' | 'desc')[] =
	// 	sortType === SortingTypes.Alphabetically
	// 		? ['asc', 'desc']
	// 		: ['desc', 'asc'];

	return orderBy(identity);
}

function filterArtistList(query: string) {
	if (!query) return filter<Artist>((item) => true);
	return filter<Artist>((item) =>
		item.name.toUpperCase().includes(query.toUpperCase())
	);
}
