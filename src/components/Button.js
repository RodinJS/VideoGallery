import * as RODIN from 'rodin/core';
export class Button {
    constructor(width, height, name, image) {
        this.width = width;
        this.height = height;
        this.name = name;
        this.image = image;
        this.draw();
    }
    //
    draw() {
        this.element = new RODIN.Plane(this.width, 0.2, new THREE.MeshBasicMaterial({transparent: true, map: RODIN.Loader.loadTexture('./src/assets/icons/Button_background_short.png')}));
        this.element._threeObject.material.visible = false;
        this.element.name = this.name;
        this.glow = new RODIN.Plane(this.width, 0.2, new THREE.MeshBasicMaterial({transparent: true, map: RODIN.Loader.loadTexture('./src/assets/icons/Button_glow.png')}))
        this.button = new RODIN.Element({
            name: this.name,
            width: this.width,
            height: this.height,
            background: {
                image: {
                    url: this.image
                }
            },
            border: {
                radius: 0.1
            }
        });

        this.button.on(RODIN.CONST.READY, btn => {
            this.element.position.z = 0.01;
            this.element.add(this.glow);
            this.glow.position.z = 0.02;
            this.glow.scale.set(0.8,.8,.8);
            this.element.add(btn.target);
            btn.target.scale.set(.8,.8,.8);
            btn.target.position.z = 0.03;
        });
    }

    get active() {
        return this.element;
    }
}