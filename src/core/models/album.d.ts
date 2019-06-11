import { Track } from "./Track";
export interface Album {
	id: string;
	name: string;
	image: string;
	band: string;
	releasedDate: string;
	tracks: Track[];
}
