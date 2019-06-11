import { Artist } from './../../core/models/artist.d';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { fetchArtists } from '../../core/services/artists.service';
import { ofType } from '../../core/utils';
import { RootState } from '../root-state';
import { overviewActions, OverviewActions } from './overview.actions';
import { rootStateActions, RootStateActions } from '../root-state.actions';
import { ErrorInfo } from '../../core/interfaces/error';

const appInit = (action$: Observable<RootStateActions>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(rootStateActions.applicationLoaded),
    mergeMap(action =>
      getArtists(true).pipe(
        map(
          result => overviewActions.fetchArtistsSuccessful(result),
          catchError(error => of(overviewActions.fetchArtistsFailure(error)))
        )
      )
    )
  );

const updateArtists = (action$: Observable<OverviewActions>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(overviewActions.fetchArtists),
    mergeMap(action =>
      getArtists().pipe(
        map(
          result => overviewActions.fetchArtistsSuccessful(result),
          catchError(error =>
            of(
              overviewActions.fetchArtistsFailure({
                message: 'Unable to fetch artists from server',
                name: 'ArtistsFechError',
                source: error.data,
              })
            )
          )
        )
      )
    )
  );

export const overviewEpics = Object.freeze({
  appInit,
  updateArtists,
});

function getArtists(force?: boolean): Observable<Artist[]> {
  return fetchArtists(force).pipe(
    catchError(error =>
      throwError({
        message: 'Unable to fetch artists from server',
        name: 'ArtistsFechError',
        source: error.data,
      } as ErrorInfo)
    )
  );
}
