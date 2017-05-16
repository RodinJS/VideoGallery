import * as RODIN from 'rodin/core';
import {NavigationButtons} from './changeViewButtons.js';

export function linearView(thumbs, offset = 0) {
    let navigate = new NavigationButtons();
    let linear = new RODIN.Sculpt();
    RODIN.Scene.add(linear);
    let segments = 10;
    for (let i = offset; i < offset + 10 && i < thumbs.length; i++) {
        if (!thumbs[i].element) {
            thumbs[i].draw();
            thumbs[i].element.on(RODIN.CONST.READY, e => {
                let thumb = e.target;
                linear.add(thumb);
                thumb.position.z = -3;
                thumb.position.x = Math.PI/segments;
                thumb.position.y = 1.6;
                thumb.rotation.y = i * Math.PI /segments;
            })
        }
    }
    navigate.setActiveButton('linear');
}

export function gridView() {
}

export function cylindricView() {
}
