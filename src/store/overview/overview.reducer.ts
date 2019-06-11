import { createReducer } from 'deox';
import { SortingTypes } from '../../core/models/sorting-types.enum';
import { OverviewState } from './overview-state';
import { overviewActions } from './overview.actions';

const initialState: Readonly<OverviewState> = {
  isLoading: false,
  // list: [],
  query: '',
  resources: {
    artists: null,
  },
  sortType: SortingTypes.Alphabetically,
};

export const overviewReducer = createReducer(initialState, handleAction => [
  handleAction(overviewActions.fetchArtists, state => ({
    ...state,
    isLoading: true,
  })),
  handleAction(overviewActions.fetchArtistsSuccessful, (state, action) => ({
    ...state,
    isLoading: false,
    resources: {
      artists: {
        data: action.payload,
        error: false,
        errorData: null,
      },
    },
  })),
  handleAction(overviewActions.fetchArtistsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    resources: {
      artists: {
        data: state.resources.artists ? state.resources.artists.data : null,
        error: true,
        errorData: action.payload,
      },
    },
  })),
  handleAction(overviewActions.sortList, (state, action) => ({
    ...state,
    sortType: action.payload,
  })),
  handleAction(overviewActions.filtertList, (state, action) => {
    return {
      ...state,
      query: action.payload,
    };
  }),
]);
