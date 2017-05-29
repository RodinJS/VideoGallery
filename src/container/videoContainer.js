import * as RODIN from 'rodin/core';
import { videos } from '../data/videos.js';
import { VideoThumbnail } from '../components/videoThumbnail.js';
import { linearView, cylindricView, gridView } from '../components/galleryView.js';
import { VideoPlayer } from './videoPlayerConatainer.js';
export class VideoContainer {
    constructor() {
        this.videoPlayer = new VideoPlayer();
        this.thumbs = videos.map(v => new VideoThumbnail(v, this.videoPlayer));

        this.init();
    }

    init() {

    }

    setView(type = 'linear') {
        type = type.toLowerCase();
        switch (type) {
            case 'linear':
                linearView(this.thumbs);
                break;
            case 'flat':
                gridView(this.thumbs);
                break;
            case 'cylinder':
                cylindricView(this.thumbs);
                break;
            default:
                linearView(this.thumbs);
        }
    }
}