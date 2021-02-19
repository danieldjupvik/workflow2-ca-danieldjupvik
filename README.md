# Workflow 2 - Course Assignment - danieldjupvik

<div align="center">

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://lasr.danieldjupvik.dev/)
<br />
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5b677e607def4466b8084eb76be4f0d7)](https://google.no) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/InternationalAdvice0/workflow2-ca-danieldjupvik/network/dependencies) [![Website lasr.danieldjupvik.dev](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://lasr.danieldjupvik.dev) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/InternationalAdvice0/workflow2-ca-danieldjupvik/blob/dev/LICENSE)

</div>

In this course assignment you will be tasked to modernize an existing website. So that you can ship bug free code.

## Prerequisites

node v14.15.3 (yarn v1.22.10)

### Install packages

- install packages with yarn `yarn install`

## Run Dev Server

**Option 1** (install Parcel global on your computer):

- run in terminal `yarn global add parcel-bundler`
- cd into `workflow2-ca-danieldjupvik` folder
- run `parcel *.html`
- website should be accessible on `localhost:1234`

**Option 2** (if you cannot/wont install Parcel on your computer);

- cd into `workflow2-ca-danieldjupvik` folder
- To run in development mode `yarn dev`
- To run in production mode `yarn build`
- website should be accessible on `localhost:1234`

## Test with Jest

- cd into workflow2-ca-danieldjupvik folder
- run `yarn test`

## GitHub Actions Config

- GitHub Actions is configured to merge dev branch into main branch if Jest tests success without faults when you push or add a pull request on dev branch.

### License

- [MIT LICENSE](https://opensource.org/licenses/MIT)
- Copyright 2021
