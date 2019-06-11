import { DetailState } from './detail-state';
import { Album } from '../../core/models/album';
import { Artist } from '../../core/models/artist';
import { getStore } from '..';
import { RootState } from '../root-state';

const store = getStore().getState();

function getAlbumsByArtist(list: Album[], artistId: string) {
  list.filter(item => item.band === artistId);
}

export const albumsByArtistSelector = (state: DetailState) => {
  if (!(state.resources.albums && state.resources.albums.data)) return [];
  return getAlbumsByArtist(state.resources.albums.data, state.artistId);
};

function getArtistById(list: Artist[], artistId: string) {
  list.filter(item => item.id === artistId);
}

export const artistByIdSelector = (state: RootState) => {
  if (!(state.overview.resources.artists && state.overview.resources.artists.data)) return [];

  return getArtistById(state.overview.resources.artists.data, state.detail.artistId);
};
