import * as RODIN from 'rodin/core';
import {blinkAnimation} from '../components/BlinkAnimation.js';
import { VideoContainer } from './videoContainer.js';
import { Navigation} from '../components/Navigation.js';
export class MainContainer {
    constructor() {
        this.enviroment = new RODIN.Sphere(90, 720, 4, new THREE.MeshBasicMaterial({
            side: THREE.BackSide,
            map: RODIN.Loader.loadTexture('./src/assets/space.jpg')
        }));
        this.loader = new RODIN.Plane(8, 4.5, new THREE.MeshBasicMaterial({transparent: true, map: RODIN.Loader.loadTexture('./src/assets/Rodin_video_gallery.png')}));
        this.loader.on(RODIN.CONST.READY, env => {
            this.enviroment.add(env.target);
            env.target.position.z = - 10
        });
        this.enviroment.needsUpdate = true;
        this.transition = blinkAnimation();
        this.containers = [];
    }

    get object() {
        return this.enviroment;
    }

    run() {
        RODIN.Scene.add(this.enviroment);
        // this.changeEnviroment();
        //
        setTimeout(() => {
            this.transition.close()

        }, 8000)
        setTimeout(() => {
            this.changeEnviroment();
            this.transition.open();

        }, 12000)

    }

    changeEnviroment() {
        this.loader._threeObject.visible = false;
        this.enviroment._threeObject.material.map = RODIN.Loader.loadTexture('./src/assets/env.jpg');
        let videoContainer = new VideoContainer();
        this.containers.push(new Navigation(videoContainer));
    }
}
