import * as RODIN from 'rodin/core';

let view = null;

export function linearView(thumbs) {
    view = new RODIN.HorizontalGrid(4,1, 1.1,1.8);
    view.onShow((elem, index, alpha) => {
        elem.visible = true;
    });

    view.onHide((elem, index, alpha) => {
        elem.parent = null;
        // boxes[index] = null;
        elem.visible = false;
    });
    view.onMove(()=>{});

    view.setGetElement((index) => {
        if (index < 0)
            return;

        if (index >= thumbs.length)
            return;
        if (!thumbs[index].element) {
            thumbs[index].draw(index);
        }
        return thumbs[index].main;
    });
    view.sculpt.position.set(-1,2,-3);
    RODIN.Scene.add(view.sculpt);

}

export function gridView(thumbs) {
    view = new RODIN.HorizontalGrid(1,1, 1.1,1.8);
    view.onShow((elem, index, alpha) => {
        elem.visible = true;
    });

    view.onHide((elem, index, alpha) => {
        elem.parent = null;
        // boxes[index] = null;
        elem.visible = false;
    });
    view.onMove(()=>{});

    view.setGetElement((index) => {
        if (index < 0)
            return;

        if (index >= thumbs.length)
            return;
        if (!thumbs[index].element) {
            thumbs[index].draw(index);
        }
        return thumbs[index].main;
    });
    view.sculpt.position.set(-1,2,-3);
    RODIN.Scene.add(view.sculpt);
}

export function cylindricView() {
    console.log('cylinder');
}