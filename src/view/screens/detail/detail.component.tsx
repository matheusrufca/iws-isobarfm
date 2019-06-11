import { AnyAction } from 'deox';
import {
	Body,
	Container,
	Content,
	Header,
	Icon,
	Input,
	Item,
	Left,
	List,
	ListItem,
	Text,
	Thumbnail,
	Col,
	Grid
} from 'native-base';
import * as React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { connect } from 'react-redux';
import { ErrorInfo } from '../../../core/interfaces/error';
import { Artist } from '../../../core/models/artist';
import { SortingTypes } from '../../../core/models/sorting-types.enum';
import { Nullable } from '../../../core/models/types';
import { overviewActions } from '../../../store/overview/overview.actions';
import {
	selectArtists,
	selectError,
	selectIsLoading
} from '../../../store/overview/overview.selectors';
import { RootState } from '../../../store/root-state';

interface Props {}

interface State {
	hideSummary: boolean;
}

class Detail extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hideSummary: true
		};
	}

	async componentDidMount() {
		this.setState({ hideSummary: true });
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (prevProps === this.props) return;
		this.setState({});
	}

	render() {
		return (
			<Container>
				<Header />
				<Grid>
					<Col style={{ backgroundColor: '#635DB7', height: 200 }} />
				</Grid>
				<Grid>
					<Col style={{ backgroundColor: '#635DB7', height: 200 }} />
				</Grid>
			</Container>
		);
	}

	private searchBar() {
		return (
			<Header searchBar rounded>
				<Item>
					<Icon name="search" />
					{!!this.state.query && (
						<Icon name="close" onPress={this.props.clearQuery} />
					)}
					<Input
						placeholder="Search"
						onChange={this.props.handleInputChange}
						value={this.state.query}
					/>
					{this.sortIcon()}
				</Item>
			</Header>
		);
	}

	private listItem(item: Artist) {
		return (
			<ListItem avatar key={item.id} button={true}>
				<Left>
					<Thumbnail source={{ uri: item.image }} />
				</Left>
				<Body>
					<Text>{item.name}</Text>
					<Text note>{item.numPlays} PLAYS</Text>
				</Body>
			</ListItem>
		);
	}

	private sortIcon() {
		let icon;
		if (this.state.sortType === SortingTypes.Alphabetically) {
			icon = (
				<Icon
					name="sort-alpha-asc"
					onPress={() => this.toggleSort(this.state.sortType)}
				/>
			);
		} else {
			icon = (
				<Icon
					name="sort-numeric-asc"
					onPress={() => this.toggleSort(this.state.sortType)}
				/>
			);
		}
		return icon;
	}

	private toggleSummary(state: boolean = !!!this.state.hideSummary) {
		this.setState({ hideSummary: state });
	}

	private renderTitle() {}

	private renderDetails() {}

	private renderBackgroundImage() {}

	private renderDescription() {}

	private renderAlbumsList() {}
}
const mapStateToProps = (state: RootState) => ({
	query: state.overview.query,
	sortType: state.overview.sortType,
	data: selectArtists(state.overview),
	error: selectError(state.overview),
	isLoading: selectIsLoading(state.overview)
});

const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => ({
	handleInputChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
		dispatch(overviewActions.filtertList(event.nativeEvent.text));
	},
	handleSortChange(sortType: SortingTypes) {
		dispatch(overviewActions.sortList(sortType));
	},
	clearQuery() {
		dispatch(overviewActions.filtertList(''));
	}
});

export const detailComponent = connect(
	mapStateToProps,
	mapDispatchToProps
)(Detail);
