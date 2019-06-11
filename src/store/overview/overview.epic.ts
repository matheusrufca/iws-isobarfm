import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ErrorInfo } from '../../core/interfaces/error';
import { Screens } from '../../core/models/screen.enum';
import { fetchArtists } from '../../core/services/artists.service';
import { ofType } from '../../core/utils';
import { registerRootComponent } from '../../navigators/navigation';
import { detailActions, DetailsActions } from '../detail/detail.actions';
import { RootState } from '../root-state';
import { rootStateActions, RootStateActions } from '../root-state.actions';
import { Artist } from './../../core/models/artist.d';
import { overviewActions, OverviewActions } from './overview.actions';

const appInit = (
	action$: Observable<RootStateActions>,
	state$: Observable<RootState>
) =>
	action$.pipe(
		ofType(rootStateActions.applicationLoaded),
		mergeMap((action) =>
			getArtists(true).pipe(
				map(
					(result) => overviewActions.fetchArtistsSuccessful(result),
					catchError((error) => of(overviewActions.fetchArtistsFailure(error)))
				)
			)
		)
	);

const updateArtists = (
	action$: Observable<OverviewActions>,
	state$: Observable<RootState>
) =>
	action$.pipe(
		ofType(overviewActions.fetchArtists),
		mergeMap((action) =>
			getArtists().pipe(
				map(
					(result) => overviewActions.fetchArtistsSuccessful(result),
					catchError((error) =>
						of(
							overviewActions.fetchArtistsFailure({
								message: 'Unable to fetch artists from server',
								name: 'ArtistsFechError',
								source: error.data
							})
						)
					)
				)
			)
		)
	);

const navigateToDetail = (
	action$: Observable<DetailsActions>,
	state$: Observable<RootState>
) =>
	action$.pipe(
		ofType(detailActions.loadDetail),
		tap((action) => {
			registerRootComponent(Screens.Detail);
		}),
		map((action) => detailActions.fetchData(action.payload.artistId))
	);

export const overviewEpics = Object.freeze({
	appInit,
	updateArtists,
	navigateToDetail
});

function getArtists(force?: boolean): Observable<Artist[]> {
	return fetchArtists(force).pipe(
		catchError((error) =>
			throwError({
				message: 'Unable to fetch artists from server',
				name: 'ArtistsFechError',
				source: error.data
			} as ErrorInfo)
		)
	);
}
