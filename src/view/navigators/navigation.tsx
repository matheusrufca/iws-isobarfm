import { Navigation } from 'react-native-navigation';
import { Screens } from '../../core/models/screen.enum';

export const registerRootComponent = (view: Screens) => {
	Navigation.setRoot({
		root: {
			component: {
				id: view,
				name: view
			}
		}
	});
};
