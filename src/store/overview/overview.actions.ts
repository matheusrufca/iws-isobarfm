import { createAction } from 'deox';
import { ErrorInfo } from '../../core/interfaces/error';
import { Artist } from '../../core/models/artist';
import { SortingTypes } from '../../core/models/sorting-types.enum';

const fetchArtists = createAction('[Overview] FETCH_ARTISTS');
const fetchArtistsSuccessful = createAction(
  '[Overview] FETCH_ARTISTS_SUCCESSFUL',
  resolve => (payload: Artist[], meta?: object) => resolve(payload, meta ? meta : {})
);
const fetchArtistsFailure = createAction(
  '[Overview] FETCH_ARTISTS_FAILURE',
  resolve => (payload: ErrorInfo, meta?: object) =>
    resolve(payload, meta ? Object.assign(meta, { error: true }) : { error: true })
);
const sortList = createAction('[Overview] SORT_LIST', resolve => (payload: SortingTypes, meta?: object) =>
  resolve(payload, meta ? meta : {})
);
const filtertList = createAction('[Overview] FILTER_LIST', resolve => (payload: string, meta?: object) =>
  resolve(payload, meta ? meta : {})
);

export type OverviewActions =
  | ReturnType<typeof fetchArtists>
  | ReturnType<typeof fetchArtistsFailure>
  | ReturnType<typeof fetchArtistsSuccessful>
  | ReturnType<typeof filtertList>
  | ReturnType<typeof sortList>;

export const overviewActions = Object.freeze({
  fetchArtists,
  fetchArtistsFailure,
  fetchArtistsSuccessful,
  filtertList,
  sortList,
});
