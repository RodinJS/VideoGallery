import * as RODIN from 'rodin/core';


export function blinkAnimation() {
    let transSculpt = new RODIN.Sculpt();
    let upTransition = new RODIN.Plane(0.05, 0.05, new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0xFFFFFF
        // map: RODIN.Loader.loadTexture('./src/assets/desert.jpg')
    }));
    upTransition.position.z = -0.02;
    upTransition.position.y = 0.025;
    let downTransition = new RODIN.Plane(0.05, 0.05, new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0xFFFFFF
        // map: RODIN.Loader.loadTexture('./src/assets/desert.jpg')
    }));
    transSculpt._threeObject.renderOrder = 10000;
    downTransition.position.z = -0.02;
    downTransition.position.y = -0.025;
    transSculpt.add(upTransition);
    transSculpt.add(downTransition);

    let setCamera = (camera) => {
        camera.add(transSculpt);
    };

    let blink = (pos, type) => {
        let animate = new RODIN.AnimationClip(type, {
            position: {
                y: pos,
            },
        });
        animate.duration(5000);
        return animate;
    };
    let close = () => {
        upTransition.animation.add(blink(-0.0125, 'close'));

        downTransition.animation.add(blink(0.0125, 'close'));

        upTransition.animation.start('close');
        upTransition.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
            if (e.animation === 'close') {
            }
        });

        downTransition.animation.start('close');

    };
    let open = () => {
        upTransition.animation.add(blink(0.0125, 'open'));
        upTransition.animation.start('open');
        downTransition.animation.add(blink(-0.0125, 'open'));
        downTransition.animation.start('open');
    };
    return { setCamera, close, open}
}