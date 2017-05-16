import * as RODIN from 'rodin/core';

export class VideoThumbnail {
    constructor(params) {
        this.element = null;
        this.params = params;
    }

    draw() {
        this.element = new RODIN.Element({
            name: this.params.name,
            width: 0.6,
            height: 0.4,
            background: {
                image: {url: this.params.thumbnail}
            },
            border: {
                radius: 0.05
            }
        });

        return this.element;
    }
}