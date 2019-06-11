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
	Thumbnail
} from 'native-base';
import * as React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { connect } from 'react-redux';
import { ErrorInfo } from '../../../core/interfaces/error';
import { Artist } from '../../../core/models/artist';
import { SortingTypes } from '../../../core/models/sorting-types.enum';
import { Nullable } from '../../../core/models/types';
import { detailActions } from '../../../store/detail/detail.actions';
import { overviewActions } from '../../../store/overview/overview.actions';
import {
	selectArtists,
	selectError,
	selectIsLoading
} from '../../../store/overview/overview.selectors';
import { RootState } from '../../../store/root-state';

interface Props {
	clearQuery: any;
	data: Artist[];
	error: Nullable<ErrorInfo>;
	handleInputChange: any;
	handleSortChange: any;
	navigateToDetail: any;
	sortType: SortingTypes;
	query: string;
}

interface State {
	data: Artist[];
	query: string;
	sortType: SortingTypes;
}

class Overview extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			data: this.props.data,
			query: this.props.query,
			sortType: this.props.sortType
		};
	}

	async componentDidMount() {
		this.setState({
			data: this.props.data,
			query: this.props.query,
			sortType: this.props.sortType
		});
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (prevProps === this.props) return;
		this.setState({
			data: this.props.data,
			query: this.props.query,
			sortType: this.props.sortType
		});
	}

	render() {
		return (
			<Container>
				{this.renderSearchBar()}
				<Content>
					<List>
						{this.state.data.map((item) => this.renderListItem(item))}
					</List>
				</Content>
			</Container>
		);
	}

	private renderSearchBar() {
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
					{this.renderSortIcon()}
				</Item>
			</Header>
		);
	}

	private renderListItem(item: Artist) {
		return (
			<ListItem
				avatar
				key={item.id}
				button={true}
				onPress={() => this.props.navigateToDetail(item.id)}
			>
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

	private renderSortIcon() {
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

	private toggleSort(sortType: SortingTypes) {
		sortType =
			sortType === SortingTypes.Alphabetically
				? SortingTypes.Popularity
				: SortingTypes.Alphabetically;
		this.props.handleSortChange(sortType);
	}
}
const mapStateToProps = (state: RootState) => ({
	query: state.overview.query,
	sortType: state.overview.sortType,
	data: selectArtists(state.overview),
	error: selectError(state.overview),
	isLoading: selectIsLoading(state.overview)
});

const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => ({
	navigateToDetail(artistId: string) {
		dispatch(detailActions.loadDetail(artistId));
	},
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

export const overviewComponent = connect(
	mapStateToProps,
	mapDispatchToProps
)(Overview);

