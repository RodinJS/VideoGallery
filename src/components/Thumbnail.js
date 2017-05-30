import * as RODIN from 'rodin/core';
import { VideoPlayer } from '../container/videoPlayerConatainer.js';
import { blinkAnimation } from './BlinkAnimation.js';

export class Thumbnail {
    constructor(params, videoPlayer) {
        this.videoPlayer = videoPlayer;
        this.transition = blinkAnimation();
        this.element = null;
        this.main = null;
        this.params = params;
        this.more = new RODIN.Text({
            text: 'More About Video',
            fontSize: 0.065,
            color: 0xffffff,
            background: {
                image: { url: './src/assets/more_bg.png' }
            }
        });
        this.more.name = 'more';
        this.more._threeObject.material.visible = false;
        this.more.on(RODIN.CONST.READY, evt => {
            let more = evt.target;
            more.width = 1.6;
            more.height = 0.3;
            more._threeObject.geometry.center();
            more.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, this.showHideDescription.bind(this));
            more.on(RODIN.CONST.GAMEPAD_HOVER, this.moreHover.bind(this));
            more.on(RODIN.CONST.GAMEPAD_HOVER_OUT, this.moreHoverOut.bind(this));
            more.position.y = -0.35;
            more.position.z = 0.1;
        })
    }

    moreHover(evt) {
        this.thumbAnimation(evt.target, { position: { z: 0.2 } }, 'moreHover', 50);
    }

    moreHoverOut(evt) {
        this.thumbAnimation(evt.target, { position: { z: 0.1 } }, 'moreHoverOut', 50);
    }

    draw(id) {
        this.main = new RODIN.Sculpt();
        this.element = new RODIN.Element({
            name: this.params.name,
            width: 1.6,
            height: 0.9,
            background: {
                image: { url: this.params.thumbnail }
            },
            border: {
                radius: 0.05
            },
            transparent: false
        });
        this.element.id = id;
        this.element.on(RODIN.CONST.READY, el => {
            this.main.add(el.target);
            this.main.add(this.addDescription(id));
            let title = new RODIN.Text({ text: this.params.title, fontSize: 0.12, color: 0xffffff });
            title.on(RODIN.CONST.READY, text => {
                let { target } = text;
                target.position.y = 0.3;
                target.position.x = -0.55;
                target.position.z = 0.01;
                el.target.add(target);
                el.target.add(this.more);
            });
        });
        this.element.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, this.onClick.bind(this));
        this.element.on(RODIN.CONST.GAMEPAD_HOVER, this.onHover.bind(this));
        this.element.on(RODIN.CONST.GAMEPAD_HOVER_OUT, this.onHoverOut.bind(this));
        return this.main;
    }


    onClick(e) {
        this.more._threeObject.material.visible = true;
        this.thumbAnimation(e.target, { position: { z: .5 } }, 'element', 100);
        if (e.target.position.z === 0) {
            this.main._parent._children.map(elem => {
                this.reset(elem, e.target.id);
            });
        } else if (!this.description._threeObject.visible && e.target.position.z > 0) {
            console.log(this.videoPlayer)
            this.videoPlayer.playVideo(this.params.url, this.params.title, './src/assets/icons/rodin.jpg');
            RODIN.Scene.go('videoPlayerScene')
        }

    }

    addDescription(id) {
        this.description = new RODIN.Element({
            name: 'description',
            width: 1.6,
            height: 0.9,
            background: {
                opacity: 0.5,
                color: '0x000000'
            },
            border: {
                radius: 0.05
            }
        });
        this.description._threeObject.visible = false;
        this.description.id = id;
        this.description.scale.set(0, 0, 0);
        let description = new RODIN.DynamicText({
            width: 1.6,
            height: .9,
            text: this.params.description,
            fontSize: 0.1,
            color: 0xffffff
        });
        description._threeObject.renderOrder = 1;
        description.position.y = 0.3;
        description.position.z = .01;
        this.description.on(RODIN.CONST.READY, evt => {
            evt.target.add(description);
            evt.target.position.z = 0.52;
        });
        this.description.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, this.showHideDescription.bind(this));
        return this.description;
    }

    onHover(e) {
        // this.more._threeObject.material.visible = true;
    }

    onHoverOut(e) {
        // this.more._threeObject.material.visible = false;
    }

    showHideDescription() {
        this.element._children.map(i => {
            i._threeObject.visible = !i._threeObject.visible;
        });
        this.description._threeObject.visible = !this.description._threeObject.visible;
        if (this.description._threeObject.visible) {
            this.description.scale.set(1, 1, 1);
        }
    }

    thumbAnimation(obj, params, name, duration) {
        const navigationAnimation = new RODIN.AnimationClip(name, params);
        navigationAnimation.duration(duration);
        obj.animation.add(navigationAnimation);
        obj.animation.start(name);
    }

    reset(el, id) {
        el._children.map(ch => {
            if (ch.name === 'element' && ch.id !== id) {
                this.thumbAnimation(ch, { position: { z: 0 } }, 'elementHide', 100);
            }
            if (ch.name === 'description' && ch.id !== id) {
                ch._threeObject.visible = false;
            }
        });
    }
}