import { createAction } from 'redux-starter-kit';

const applicationLoaded = createAction('[RootState] APLICATION_LOADED');

export type RootStateActions = ReturnType<typeof applicationLoaded>;

export const rootStateActions = Object.freeze({ applicationLoaded });
