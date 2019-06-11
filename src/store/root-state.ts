import { OverviewState } from './overview/overview-state';
import { DetailState } from './detail/detail-state';

export interface RootState {
  detail: DetailState;
  overview: OverviewState;
}
