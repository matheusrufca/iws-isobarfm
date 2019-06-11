import { AnyAction } from 'deox';
import {
	Button,
	Col,
	Container,
	Grid,
	Header,
	Icon,
	Item,
	Text,
	Thumbnail,
	Left
} from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';
import { Album } from '../../../core/models/album';
import { Artist } from '../../../core/models/artist';
import { Screens } from '../../../core/models/screen.enum';
import { registerRootComponent } from '../../../navigators/navigation';
import {
	selecAlbumsByArtsts as selecAlbumsByArtst,
	selectArtistsById
} from '../../../store/detail/detail.selectos';
import { RootState } from '../../../store/root-state';
import { Nullable } from '../../../core/models/types';

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
				{this.renderDescription()}
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
						</Button>{' '}
					</Item>
				</Left>
			</Header>
		);
	}

	private renderDescription() {
		const description = this.state.artist ? this.state.artist.biography : '';
		return <Text>{description}</Text>;
	}

	private renderAlbumsList() {
		return (
			<Grid>
				{this.state.albums.map((item) => (
					<Col>
						<Thumbnail square source={{ uri: item.image }} />
					</Col>
				))}
			</Grid>
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
