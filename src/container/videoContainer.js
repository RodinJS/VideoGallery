import * as RODIN from 'rodin/core';
import {videos} from '../data/videos.js';
import {MainContainer} from './mainContainer.js';
import {VideoThumbnail} from '../components/videoThumbnail.js';
import {linearView, cylindricView, gridView} from '../components/galleryView.js';
export class VideoContainer {
    constructor() {
        this.thumbs = videos.map(v => new VideoThumbnail(v));
        this.init();
    }

    init() {
        this.setView();
    }

    setView(type = 'linear') {
        switch (type) {
            case 'linear':
                linearView(this.thumbs);
                break;
            case 'grid':
                gridView(this.thumbs);
                break;
            case 'cylindric':
                cylindricView(this.thumbs);
                break;
            default:
                linearView(this.thumbs);
        }
    }
}