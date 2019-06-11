import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { getStore } from '../../store';
import { registerScreens } from '../screens';
import { registerRootComponent } from './navigation';
import { Screens } from '../../core/models/screen.enum';

const store = getStore();

/**
 * Register screens and components for react native navigation
 */
registerScreens({ store, Provider });

const app = () => {
	Navigation.events().registerAppLaunchedListener(() => {
		Navigation.setDefaultOptions({
			topBar: { visible: false }
		});
		registerRootComponent(Screens.Overview);
	});
};

export default app;
