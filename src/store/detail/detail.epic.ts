import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { getStore } from '..';
import { ErrorInfo } from '../../core/interfaces/error';
import { Album } from '../../core/models/album';
import { Artist } from '../../core/models/artist';
import { fetchAlbums, fetchArtist } from '../../core/services/artists.service';
import { ofType } from '../../core/utils';
import { RootState } from '../root-state';
import { rootStateActions, RootStateActions } from '../root-state.actions';
import { detailActions, DetailsActions } from './detail.actions';
import { Navigation } from 'react-native-navigation';
import { Screens } from '../../core/models/screen.enum';

const appInit = (
	action$: Observable<RootStateActions>,
	state$: Observable<RootState>
) =>
	action$.pipe(
		ofType(rootStateActions.applicationLoaded),
		mergeMap((action) => {
			const albums$ = getAlbums(true).pipe(
				catchError((error: ErrorInfo) => of(error))
			);
			return albums$.pipe(
				map(
					(result) => detailActions.fetchDataSuccessful({ albums: result }),
					catchError((error) => of(detailActions.fetchDataFailure(error)))
				)
			);
		})
	);

const loadDetail = (
	action$: Observable<DetailsActions>,
	state$: Observable<RootState>
) =>
	action$.pipe(
		ofType(detailActions.fetchData),
		mergeMap((action) => {
			const $albums = getAlbums().pipe(catchError((error) => of(error)));
			const $artist = getArtist(action.payload).pipe(
				catchError((error) => of(error))
			);

			return forkJoin([$albums, $artist]).pipe(
				map(([albums, artist]) => {
					const store = getStore();
					const albumsFetchinstSucceed = Array.isArray(albums);
					const artistFetchinstSucceed = Array.isArray(artist);

					if (albumsFetchinstSucceed && artistFetchinstSucceed) {
						return detailActions.fetchDataSuccessful({ albums, artist });
					}
					if (!(albumsFetchinstSucceed && artistFetchinstSucceed)) {
						return detailActions.fetchDataFailure({
							albums,
							artist
						});
					}
					if (albumsFetchinstSucceed) {
						store.dispatch(detailActions.fetchDataFailure({ artist }));
						return store.dispatch(
							detailActions.fetchDataSuccessful({ albums })
						);
					}
					if (artistFetchinstSucceed) {
						store.dispatch(detailActions.fetchDataFailure({ artist }));
						return store.dispatch(
							detailActions.fetchDataSuccessful({ artist })
						);
					}
				})
			);
		})
	);

export const detailEpics = Object.freeze({
	appInit,
	loadDetail
});

function getArtist(artistId: string): Observable<Artist> {
	return fetchArtist(artistId).pipe(
		catchError((error) =>
			throwError({
				message: 'Unable to fetch artists from server',
				name: 'ArtistsFechError',
				source: error.data
			} as ErrorInfo)
		)
	);
}

function getAlbums(force?: boolean): Observable<Album[]> {
	return fetchAlbums(force).pipe(
		catchError((error) =>
			throwError({
				message: 'Unable to fetch albums from server',
				name: 'ArtistsFechError',
				source: error.data
			} as ErrorInfo)
		)
	);
}
