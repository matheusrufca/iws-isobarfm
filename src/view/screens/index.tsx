import { Navigation } from 'react-native-navigation';
import { Screens } from '../../core/models/screen.enum';
import { detailComponent } from './detail/detail.component';
import { overviewComponent } from './overview/overview.component';

const registerComponentWithRedux = (redux: any) => (
	name: string,
	component: any
) => {
	Navigation.registerComponentWithRedux(
		name,
		() => component,
		redux.Provider,
		redux.store
	);
};

export function registerScreens(redux: any) {
	registerComponentWithRedux(redux)(Screens.Overview, overviewComponent);
	registerComponentWithRedux(redux)(Screens.Detail, detailComponent);
}
