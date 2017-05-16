import * as RODIN from 'rodin/core';

export class NavigationButtons {
    constructor() {
        this.buttons = [];
        this.btnArea = new RODIN.Element({
            name: 'buttonArea',
            width: 0.8,
            height: 0.25,
            background: {
                color: '0xffffff'
            },
            border: {
                radius: 0.2
            }
        });
        this.btnArea.on(RODIN.CONST.READY, e => {
            RODIN.Scene.add(e.target);
            e.target.position.z = -2;
            e.target.position.y = 1.2;
            let type = ['linear', 'grid', 'cylindric'];
            for (let i = 0; i < 3; i++) {
                let button = new RODIN.Element({
                    name: type[i],
                    width: 0.2,
                    height: 0.2,
                    background: {
                        color: '0x000000'
                    },
                    border: {
                        radius: 0.1
                    }
                });
                this.buttons.push(button);
                button.on(RODIN.CONST.READY, evt => {
                    let btn = evt.target;
                    this.btnArea.add(btn);
                    btn.position.z = 0.02;
                    btn.position.x = -0.25 + 0.25 * i;
                });
                button.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, this.change);
                button.on(RODIN.CONST.GAMEPAD_HOVER, this.buttonAnimation);
            }
        });

    }

    get navigation() {
        return this.buttons;
    }
    change(e) {
        console.log(e)
    }

    get sculpt() {
        return this.btnArea;
    }

    setActiveButton(type) {
        this.buttons.map(btn => btn.name === type ? btn.visible = true: btn.visible = false)
    }

    buttonAnimation(evt) {
        this._parent._children.map(ch => ch.visible = true);
    }
}