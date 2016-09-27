Low Poly Cloud WebGL Demo
==========

[![Build Status](https://travis-ci.org/enesser/low-poly-clouds-webgl.svg?branch=master)](https://travis-ci.org/enesser/low-poly-clouds-webgl.svg?branch=master)

Inspired by recent work on [Dribbble](https://dribbble.com/), I created
these low poly clouds for use in later low poly world art and games. Rendered in WebGL with three.js and served with Express 4.

![3D Scene Screenshot](https://cloud.githubusercontent.com/assets/5659221/18879899/9488cce0-849b-11e6-86a7-3f314762b2f2.png)

> Visit the live demo on CodePen: [http://codepen.io/enesser/full/QKvZyb/](http://codepen.io/enesser/full/QKvZyb/).

## Controls

![Controls Screenshot]()

Setting                 | Description
------------------------| ----------------------------
**sunColor**            | Color of sunlight.
**sunIntensity**        | Intensity of the sunlight.
**ambientLight**        | Color of ambient light in the scene.
**skyColor**   | Color of sky.
**skyWireframe**     | Toggle sky wireframe.
**cloudsOpacity**   | Opacity value of clouds.
**cloudsWireframe** | Toggle clouds wireframe.
**cloudsBaseVelocity**       | Base velocity of clouds.

## Mobile

This demo is supported on all modern mobile devices where WebGL is supported.

![Mobile Screenshot](https://cloud.githubusercontent.com/assets/5659221/18880542/d66b26b0-849d-11e6-9450-d3440f30a6b4.png)

## Installing

You’ll need [Node](https://nodejs.org/en/download/package-manager/) to get started.

```shell
$ git clone https://github.com/enesser/low-poly-clouds-webgl && cd low-poly-clouds-webgl
$ npm install -g gulp      # Install Gulp task runner
$ npm install              # Install requirements
$ npm start                # Run the demo
```

For development, you can run ``Gulp``:

```shell
$ npm install -g nodemon   # Install nodemon
$ gulp                     # Run the demo in development mode w/ nodemon
```

## Project Structure

```
|-- public/               # auto-generated client assets (via Gulp), do not edit
|-- raw/                  # source directory for client assets
|   |-- js/               # source JavaScript
|   |-- models/           # source models
|   |-- scss/             # source Sass
|
|-- routes/               # controllers for site pages
|-- views/                # handlebars templates for site pages
```

## License
Copyright (c) 2016 Eric J Nesser, MIT