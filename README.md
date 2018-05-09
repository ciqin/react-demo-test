# `react-demo`

> See how to integrate `carbon-components` and `carbon-components-react` into a project
> bootstrapped with `react-demo`

## Usage

To run this example, all you need to do is `cd` into the directory, run `yarn install`, and then `yarn start`.

## Deviations from vanilla `react-demo`

Unfortunately, `react-demo` doesn't support `.scss` files out-of-the-box, so in this example we've had to run the `yarn eject` command in order to gain access to the webpack configuration for both development and production environments.

The most notable change is adding two dependencies, `node-sass` and `sass-loader`, and adding them to the pre-existing loader that handles `.css` files.
