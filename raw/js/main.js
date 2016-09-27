'use strict';

/* global window, THREE: true */

var LowPolyCloudWebGLDemo = LowPolyCloudWebGLDemo || {};

/**
 * Entry point for Low Poly Cloud WebGL Demo
 * @param  {object} window
 */
((window, document) => {
    window.onload = () => {

        let scene,
            camera,
            renderer,
            directionalLightColor,
            directionalLight,
            ambientLightColor,
            ambientLight,
            settings,
            world,
            windowHalfX = window.innerWidth / 2,
            windowHalfY = window.innerHeight / 2;

        /**
         * Initialize scene
         */
        (function init() {

            //setup scene and perspective camera with a fov of 45, a near plane at 1, and a far plane at 1000
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.set(0, 4, 64);
            camera.lookAt(scene.position);

            //setup renderer with antialiasing enabled
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            //add rendering div to the DOM
            let container = document.createElement('div');
            document.body.appendChild(container);
            container.appendChild(renderer.domElement);

            //create the sun
            directionalLightColor = new THREE.Color();
            directionalLight = new THREE.DirectionalLight(directionalLightColor);
            directionalLight.position.set(-20, 9.7, 14);

            scene.add(directionalLight);

            //create ambient lighting
            ambientLightColor = new THREE.Color();
            ambientLight = new THREE.AmbientLight(ambientLightColor);
            scene.add(ambientLight);

            //import settings
            settings = LowPolyCloudWebGLDemo.settings();

            //import the world, but don't add it to the scene until the model is finished loading
            world = LowPolyCloudWebGLDemo.world();
            world.isAddedToScene = false;


            //update renderer and camera aspect to the new size of the drawing area on window resize
            window.addEventListener('resize', () => {
                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);

            }, false);
        })();

        /**
         * Render method, called each time a frame is rendered
         */
        (function render() {

            //update sun with settings
            directionalLight.intensity = settings.sunIntensity;
            directionalLightColor.setStyle(settings.sunColor);
            directionalLight.color = directionalLightColor;

            //update ambient lighting with settings
            ambientLightColor.setStyle(settings.ambientLight);
            ambientLight.color = ambientLightColor;

            //when world model is fully loaded (including materials and textures)
            if (world.isLoaded) {

                //add the world to the scene only when it's fully loaded
                if (!world.isAddedToScene) {

                    scene.add(world.background);

                    for (let cloud of world.clouds) {
                        scene.add(cloud);
                    }

                    world.isAddedToScene = true;
                }

                //adjust sky
                world.backgroundMaterial.color.setStyle(settings.skyColor);
                world.backgroundMaterial.wireframe = settings.skyWireframe;

                //adjust clouds
                world.cloudsMaterial.color.setStyle(settings.cloudsColor);
                world.cloudsMaterial.opacity = settings.cloudsOpacity;
                world.cloudsMaterial.wireframe = settings.cloudsWireframe;

                //move clouds
                for (let cloud of world.clouds) {
                    let newX = cloud.position.x + (settings.cloudsBaseVelocity + cloud.velocityAccelerator);
                    if (newX > 60) {
                        newX = -60;
                    }
                    cloud.position.setX(newX);
                }
            }

            //render the scene and loop for next frame update
            renderer.render(scene, camera);

            requestAnimationFrame(render);
        })();
    };
})(window, document);