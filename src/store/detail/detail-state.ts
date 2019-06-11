import { Album } from '../../core/models/album';
import { Artist } from '../../core/models/artist';
import { PageState, ApiResource } from '../../core/interfaces/states';
import { Nullable } from '../../core/models/types';
export interface DetailState extends PageState {
  // albums: Album[];
  // artist: Nullable<Artist>;
  artistId: string;
  resources: {
    albums: Nullable<ApiResource<Album[]>>;
    artist: Nullable<ApiResource<Artist>>;
  };
}
