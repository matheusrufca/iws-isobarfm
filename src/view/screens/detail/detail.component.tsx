import { AnyAction } from 'deox';
import {
	Button,
	Container,
	Header,
	Icon,
	Item,
	Left,
	Text,
	Thumbnail
} from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';
import { Album } from '../../../core/models/album';
import { Artist } from '../../../core/models/artist';
import { Screens } from '../../../core/models/screen.enum';
import { Nullable } from '../../../core/models/types';
import { registerRootComponent } from '../../../navigators/navigation';
import {
	selecAlbumsByArtsts as selecAlbumsByArtst,
	selectArtistsById
} from '../../../store/detail/detail.selectos';
import { RootState } from '../../../store/root-state';

interface Props {
	artistId: string;
	artist: Nullable<Artist>;
	albums: Album[];
	componentId: string;
}

interface State {
	artist: Nullable<Artist>;
	albums: Album[];
}

class Detail extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			artist: this.props.artist,
			albums: this.props.albums
		};
	}

	render() {
		return (
			<Container>
				{this.renderHeader()}
				{this.renderTitle()}
				{this.renderDescription()}
				{this.renderAlbumsList()}
			</Container>
		);
	}

	private renderHeader() {
		return (
			<Header>
				<Left>
					<Item>
						<Button iconLeft onPress={this.backHome}>
							<Icon name="arrow-back" />
							<Text>Back</Text>
						</Button>
					</Item>
				</Left>
			</Header>
		);
	}

	private renderTitle() {
		const title = this.state.artist ? this.state.artist.name : '';
		return <Text>{title}</Text>;
	}

	private renderDescription() {
		const description = this.state.artist ? this.state.artist.biography : '';
		return <Text>{description}</Text>;
	}

	private renderAlbumsList() {
		return (
			<Container>
				{this.state.albums.map((item) => (
					<Thumbnail square source={{ uri: item.image }} />
				))}
			</Container>
		);
	}

	private backHome() {
		registerRootComponent(Screens.Overview);
	}
}
const mapStateToProps = (state: RootState) => ({
	artist: selectArtistsById(state, state.detail.artistId),
	albums: selecAlbumsByArtst(state.detail, state.detail.artistId)
});

const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => ({});

export const detailComponent = connect(
	mapStateToProps,
	mapDispatchToProps
)(Detail);
