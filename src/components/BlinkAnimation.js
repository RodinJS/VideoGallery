import * as RODIN from 'rodin/core';


export function blinkAnimation() {
    let transSculpt = new RODIN.Sculpt();
    let upTransition = new RODIN.Plane(100, 20, new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0x000000
            // map: RODIN.Loader.loadTexture('./src/assets/desert.jpg')
    }));
    upTransition.position.z = -20;
    upTransition.position.y = 30;
    let downTransition = new RODIN.Plane(100, 20, new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0x000000
            // map: RODIN.Loader.loadTexture('./src/assets/desert.jpg')
    }));
    downTransition.position.z = -20;
    downTransition.position.y = -30;
    transSculpt.add(upTransition);
    transSculpt.add(downTransition);
    RODIN.Scene.HMDCamera.add(transSculpt);
    let blink = (pos, type) => {
        let animate = new RODIN.AnimationClip(type, {
            position: {
                y: pos,
            },
        });
        animate.duration(1000);
        return animate;
    };
    let close = () => {

        upTransition.animation.add(blink(10, 'close'));

        downTransition.animation.add(blink(-10, 'close'));

        upTransition.animation.start('close');
        upTransition.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
            if (e.animation === 'close') {}
        });

        downTransition.animation.start('close');

    };
    let open = () => {
        upTransition.animation.add(blink(30, 'open'));
        upTransition.animation.start('open');
        downTransition.animation.add(blink(-30, 'open'));
        downTransition.animation.start('open');
    };
    return { close, open }
}