import { ApiResource, PageState } from '../../core/interfaces/states';
import { Artist } from '../../core/models/artist';
import { Nullable } from '../../core/models/types';
import { SortingTypes } from '../../core/models/sorting-types.enum';

export interface OverviewState extends PageState {
  resources: {
    artists: Nullable<ApiResource<Artist[]>>;
  };
  // list: Artist[];
  query: string;
  sortType: SortingTypes;
}
