'use strict';

/* global dat: true */

var LowPolyCloudWebGLDemo = LowPolyCloudWebGLDemo || {};

/**
 * Create an instance of configurable settings for the demo.
 * You can allow or disallow a GUI for these settings with the query string "ui=true/false", ie: http://localhost:3000?ui=false
 * @return {object} Scene settings
 */
LowPolyCloudWebGLDemo.settings = function() {

    /**
     * Default sun color
     * @type {String}
     */
    const sunColor = '#fcd2a8',

        /**
         * Default sun intensity
         * @type {Number}
         */
        sunIntensity = 0.53,

        /**
         * Default ambient light color
         * @type {String}
         */
        ambientLight = '#8c8c8c',

        /**
         * Default sky color
         * @type {String}
         */
        skyColor = '#67b4e7',

        /**
         * Default show wireframe state for sky
         * @type {Boolean}
         */
        skyWireframe = false,

        /**
         * Default cloud color
         * @type {String}
         */
        cloudsColor = '#ffffff',

        /**
         * Default cloud opacity
         * @type {Number}
         */
        cloudsOpacity = 0.79,

        /**
         * Default show wireframe state for clouds
         * @type {Boolean}
         */
        cloudsWireframe = false,

        /**
         * Default cloud base velocity
         * @type {Number}
         */
        cloudsBaseVelocity = 0.008,

        /**
         * Project URL
         * @type {String}
         */
        homepage = 'https://github.com/enesser/low-poly-clouds-webgl';

    let gui = new dat.GUI({
        width: 360
    });
    gui.close();

    /**
     * Settings schema business object
     * @type {Object}
     */
    let settingsSchema = {
        /**
         * Reset settings to default
         */
        reset: function() {
            this.sunColor = sunColor;
            this.sunIntensity = sunIntensity;
            this.ambientLight = ambientLight;
            this.skyColor = skyColor;
            this.skyWireframe = skyWireframe;
            this.cloudsColor = cloudsColor;
            this.cloudsOpacity = cloudsOpacity;
            this.cloudsWireframe = cloudsWireframe;
            this.cloudsBaseVelocity = cloudsBaseVelocity;

            for (let folder in gui.__folders) {
                for (let i in gui.__folders[folder].__controllers) {
                    gui.__folders[folder].__controllers[i].updateDisplay();
                }
            }
        },

        /**
         * Go to home page
         */
        homepage: function() {
            window.open(homepage, '_blank');
        }
    };

    /**
     * Bind settings schema object to dat.gui interface.
     * @param  {object} settingsSchema
     */
    function bindSettingsSchemaToUi(settingsSchema) {

        let sunFolder = gui.addFolder('Sun');
        sunFolder.addColor(settingsSchema, 'sunColor');
        sunFolder.add(settingsSchema, 'sunIntensity').min(-10).max(50);
        sunFolder.addColor(settingsSchema, 'ambientLight');

        let skyFolder = gui.addFolder('Sky');
        skyFolder.addColor(settingsSchema, 'skyColor');
        skyFolder.add(settingsSchema, 'skyWireframe');

        let cloudsFolder = gui.addFolder('Clouds');
        cloudsFolder.addColor(settingsSchema, 'cloudsColor');
        cloudsFolder.add(settingsSchema, 'cloudsOpacity').min(0).max(1);
        cloudsFolder.add(settingsSchema, 'cloudsWireframe');
        cloudsFolder.add(settingsSchema, 'cloudsBaseVelocity').min(0).max(3);

        gui.add(settingsSchema, 'reset');
        gui.add(settingsSchema, 'homepage');
    }

    settingsSchema.reset();
    bindSettingsSchemaToUi(settingsSchema);
    return settingsSchema;
};