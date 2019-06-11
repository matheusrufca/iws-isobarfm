import { Observable, of, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';
import { Album } from '../models/album';
import { Artist } from '../models/artist';

const apiBaseURL = 'https://iws-recruiting-bands.herokuapp.com/api';
const cacheData: any = {
  albums: null,
  artists: null,
};

export function fetchArtists(force?: boolean): Observable<Artist[]> {
  const apiEndpoint = `${apiBaseURL}/bands`;
  const shouldFetch: boolean = force || !isCached('artists');
  const result$ = shouldFetch ? fetchJSON<Artist[]>(apiEndpoint) : resolveCachedResource<Artist[]>('artist');
  result$.subscribe(result => console.debug('/artists', result), error => console.error('/artists', error));
  return result$;
}

export function fetchArtist(id: string): Observable<Artist> {
  const apiEndpoint = `${apiBaseURL}/bands/${encodeURIComponent(id)}`;
  const result$ = fetchJSON<Artist>(apiEndpoint);

  result$.subscribe(result => console.debug('/artist', id, result), error => console.error('/albums', id, error));

  return result$;
}

export function fetchAlbums(force?: boolean): Observable<Album[]> {
  const apiEndpoint: string = `${apiBaseURL}/albums`;
  const shouldFetch: boolean = force || !isCached('albums');
  const result$ = shouldFetch ? fetchJSON<Album[]>(apiEndpoint) : resolveCachedResource<Album[]>('albums');
  result$.subscribe(result => console.debug('/albums', result), error => console.error('/albums', error));
  return result$;
}

function fetchJSON<T>(url: string): Observable<T> {
  return ajax.getJSON<T>(url).pipe(
    catchError(error =>
      throwError({
        message: 'An error occured while fetching data',
        name: 'Fetch data error',
        source: error,
      })
    )
  );
}

function isCached(resourceName: string): boolean {
  if (!(resourceName in cacheData)) return false;
  return !!cacheData[resourceName];
}

function resolveCachedResource<T>(resourceName: string): Observable<T> {
  if (!(resourceName in cacheData)) {
    return throwError({
      message: `Resource not found: ${resourceName}`,
      name: 'Invalid resource name',
    });
  }

  const resource: T = cacheData[resourceName];
  return of<T>(resource);
}
