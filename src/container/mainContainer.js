import * as RODIN from 'rodin/core';
import {transition} from '../components/transitionAnimation.js';
import { VideoContainer } from './videoContainer.js';
import { NavigationButtons } from '../components/navigationButtons.js';
export class MainContainer {
    constructor() {
        this.enviroment = new RODIN.Sphere(90, 720, 4, new THREE.MeshBasicMaterial({
            side: THREE.BackSide,
            map: RODIN.Loader.loadTexture('./src/assets/Intro.jpg')
        }));
        this.enviroment.needsUpdate = true;
        this.transition = transition();
        this.containers = [];
    }

    get object() {
        return this.enviroment;
    }

    run() {
        RODIN.Scene.add(this.enviroment);
        this.changeEnviroment();
        //
        // setTimeout(() => {
        //     this.transition.close()
        //
        // }, 8000)
        // setTimeout(() => {
        //     this.changeEnviroment();
        //     this.transition.open();
        //
        // }, 12000)

    }

    changeEnviroment() {
        // const galleryScene = new RODIN.Scene('galleryScene');
        // RODIN.Scene.go('galleryScene');
        this.enviroment._threeObject.material.map = RODIN.Loader.loadTexture('./src/assets/env.jpg');
        let videoContainer = new VideoContainer();
        this.containers.push(new NavigationButtons(videoContainer));
    }
}
