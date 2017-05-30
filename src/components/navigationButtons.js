import * as RODIN from 'rodin/core';
import { Icons } from '../data/buttons.js';
import { Button } from './Button.js';
export class NavigationButtons {

    constructor(videoContainer) {
        this.videoContainer = videoContainer;
        this.buttons = [];
        this.btnArea = new RODIN.Element({
            name: 'buttonArea',
            width: 0.6,
            height: 0.2,
            background: {
                opacity: 0.7,
                color: '0x008BF2'
            },
            border: {
                radius: 0.2
            }
        });
        // this.btnArea._threeObject.material.visible= false;
        this.btnArea.on(RODIN.CONST.READY, e => {
            RODIN.Scene.add(e.target);
            this.changeView = new RODIN.Text({ text: 'CHANGE VIEW', fontSize: 0.04, color: 0xFFFFFF });
            this.changeView.name = 'textChange';
            this.changeView._threeObject.material.visible = false;
            e.target.add(this.changeView);
            this.changeView.position.y = 0.13;

            e.target.position.z = -2;
            e.target.position.y = 1.3;

            for (let i = 0; i < 3; i++) {
                let button = new Button(.2, .2, Icons[i].name, Icons[i].path);
                this.buttons.push(button);
                button.active.on(RODIN.CONST.READY, evt => {
                    let btn = evt.target;
                    this.btnArea.add(btn);
                    btn.position.z = 0.02;
                    btn.position.x = -0.2 + 0.2 * i;
                    let type = new RODIN.Text({ text: evt.target.name, fontSize: 0.04, color: 0xFFFFFF });

                    type.name = 'hoverText';
                    type.on(RODIN.CONST.READY, (t) => {
                        button.active.add(type);
                        t.target.position.y = -0.13;
                        t.target._threeObject.material.visible = false;
                    });
                    btn.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, (a) => {
                        this.openNavigation(a.target);
                    });
                    this.setActiveButton('Linear');
                });
                button.active.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, this.change);
                button.active.on(RODIN.CONST.GAMEPAD_HOVER, this.onHoverAnimation.bind(this));
                button.active.on(RODIN.CONST.GAMEPAD_HOVER_OUT, this.onHoverOutAnimation.bind(this));
            }
        });
    }

    get sculpt() {
        return this.btnArea;
    }

    hideOrShowChangeView() {
        this.sculpt._threeObject.material.visible = !this.sculpt._threeObject.material.visible;
        // this.changeView._threeObject.material.visible = false;
        if (this.sculpt._threeObject.material.visible) {
            // this.changeView._threeObject.material.visible = true;
        }
    }

    setActiveButton(type) {
        this.hideOrShowChangeView();
        this.buttons.map(btn => {

            this.animation(btn.element, {
                position: {
                    x: 0
                }
            }, 'navigationClose', 300);
            btn.element.on(RODIN.CONST.ANIMATION_COMPLETE, e => {
                if (e.animation === 'navigationClose') {
                    btn.element._threeObject.material.visible = btn.element.name.toLowerCase() === type.toLowerCase();
                    btn.element._threeObject.visible = btn.element.name.toLowerCase() === type.toLowerCase();
                }
            })
        });
        this.videoContainer.setView(type)
    }

    onHoverAnimation(evt) {
        let { target } = evt;
        this.animation(target._children[1], { scale: { x: .95, y: .95, z: .95 } }, 'scaleIn', 300);
        this.changeView._threeObject.material.visible = true;
        target._children.map((ch) => {
            if (ch.name === 'hoverText') {
                ch._threeObject.material.visible = true;
            }
        })
    }

    onHoverOutAnimation(evt) {
        let { target } = evt;
        this.animation(target._children[1], { scale: { x: .8, y: .8, z: .8 } }, 'scaleOut', 300);
        // this.changeView._threeObject.material.visible = false;
        target._children.map((ch) => {
            if (ch.name === 'hoverText') {
                ch._threeObject.material.visible = false;
            }
        })
    }

    openNavigation(evt) {
        if (this.sculpt._threeObject.material.visible) {
            return this.setActiveButton(evt.name)
        }
        this.hideOrShowChangeView();
        this.buttons.map((value, key) => {
            value.element._threeObject.visible = true;
            this.animation(value.element, {
                position: {
                    x: -0.20 + 0.20 * key
                }
            }, 'navigationOpen', 300)
        });
    }


    animation(obj, params, name, duration) {
        const navigationAnimation = new RODIN.AnimationClip(name, params);
        navigationAnimation.duration(duration);
        obj.animation.add(navigationAnimation);
        obj.animation.start(name);
        return navigationAnimation;
    }
}