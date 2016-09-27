'use strict';

/* global console, THREE: true */

var LowPolyCloudWebGLDemo = LowPolyCloudWebGLDemo || {};

/**
 * Create an instance of world, represents the ThreeJS model with meshes and materials.
 * You can load high or low quality textures with the query string "quality=high/low", ie: http://localhost:3000?quality=low
 * @return {object} world model
 */
LowPolyCloudWebGLDemo.world = function() {

    const pathWorldModel = 'models/low-poly-clouds.obj';
    const pathWorldMaterial = 'models/low-poly-clouds.mtl';

    /**
     * Represents the ThreeJS model of world with meshes and materials.
     * @type {Object}
     */
    let worldObject = {

        /**
         * Are textures and materials loaded yet?
         * @type {Boolean}
         */
        isLoaded: false,

        /**
         * Texture and materials loading progress
         * @type {Number}
         */
        percentLoaded: 0,

        /**
         * Sky background mesh
         * @type {[type]}
         */
        background: null,

        /**
         * Sky background material
         * @type {[type]}
         */
        backgroundMaterial: null,

        /**
         * Cloud material
         * @type {[type]}
         */
        cloudsMaterial: null,

        /**
         * Cloud meshes
         * @type {Array}
         */
        clouds: []
    };

    /**
     * Load materials and textures, then map them to the object.
     * @param  {object} worldObject Target object to map.
     */
    function mapMaterialsTexturesToObject(worldObject) {

        let loader = new THREE.OBJMTLLoader();
        loader.load(pathWorldModel, pathWorldMaterial, (o) => {

                const cloudBaseSize = 1.8;

                worldObject.clouds = [];
                worldObject.background = o.children.find(child => child.name === 'Plane_Plane.003');
                worldObject.background.receiveShadow = true;
                worldObject.backgroundMaterial = worldObject.background.children[1].material;
                worldObject.backgroundMaterial.depthWrite = false;
                worldObject.backgroundMaterial.receiveShadow = true;

                for (let cloudTemplate of[
                    o.children.find(child => child.name === 'Cloud2_Icosphere.011'),
                    o.children.find(child => child.name === 'Cloud1_Icosphere.005')
                ]) {

                    worldObject.cloudsMaterial = cloudTemplate.children[1].material;
                    cloudTemplate.position.setY(cloudTemplate.position.y - 10);

                    for (let i = 0; i < 8; i++) {

                        let cloud = cloudTemplate.clone();

                        //randomly size clouds
                        let cloudSize = cloudBaseSize + (Math.random() * 1.2);
                        cloud.scale.set(cloudSize, cloudSize, cloudSize);

                        //randomly place clouds
                        let posXFlip = (Math.floor(Math.random() * 2) + 1) % 2 === 0 ? 1 : -1;
                        let posYFlip = (Math.floor(Math.random() * 2) + 1) % 2 === 0 ? 1 : -1;
                        let posX = cloud.position.x + (Math.random() * 50);
                        let posY = posYFlip > 0 ? cloud.position.y + (Math.random() * 3) : cloud.position.y - (Math.random() * 3);
                        cloud.position.setX(posX * posXFlip);
                        cloud.position.setY(posY);
                        cloud.position.setZ(cloud.position.z + (Math.random() * 3));

                        //give cloud random velocity accelerator
                        cloud.velocityAccelerator = (Math.random() * 0.008);

                        //add cloud to the array
                        worldObject.clouds.push(cloud);
                    }
                }

                worldObject.cloudsMaterial.transparent = true;
                worldObject.cloudsMaterial.depthWrite = false;

                worldObject.isLoaded = true;
            },

            /**
             * Successful load
             * @param  {object} xhr XmlHttpRequest
             */
            (xhr) => {
                if (xhr.lengthComputable) {
                    worldObject.percentLoaded = xhr.loaded / xhr.total * 100;
                }
            },

            /**
             * Error loading world materials and textures
             * @param  {object} xhr XmlHttpRequest
             */
            (xhr) => {
                console.error('Error loading world materials and textures', xhr);
            });
    }

    mapMaterialsTexturesToObject(worldObject);
    return worldObject;
};