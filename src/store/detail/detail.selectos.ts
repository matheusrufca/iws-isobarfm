import { DetailState } from './detail-state';
import { Album } from '../../core/models/album';
import { Artist } from '../../core/models/artist';
import { getStore } from '..';
import { RootState } from '../root-state';
import { Nullable } from '../../core/models/types';

function getAlbumsByArtist(list: Album[], artistId: string): Album[] {
	return list.filter((item) => item.band === artistId);
}

export const selecAlbumsByArtsts = (state: DetailState, artistId: string) => {
	if (!(state.resources.albums && state.resources.albums.data)) return [];
	return getAlbumsByArtist(state.resources.albums.data, artistId);
};

function getArtistById(list: Artist[], artistId: string): Nullable<Artist> {
	return list.find((item) => item.id === artistId);
}

export const selectArtistsById = (state: RootState, artistId: string) => {
	if (
		!(state.overview.resources.artists && state.overview.resources.artists.data)
	)
		return null;

	return getArtistById(state.overview.resources.artists.data, artistId);
};
