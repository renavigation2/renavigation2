#!/bin/sh

update () {
    npx ncu --packageFile "$1/package.json" -u -x path-to-regexp
    npx ncu --packageFile "$1/package.json" -u --dep dev -x path-to-regexp
}

yarn workspaces list --json | while read package; do
    package="${package/\{\"location\":\"/}"
    package=$(sed "s/\",\"name\":.*//g" <<< "$package")
    update "$package"
done

yarn clean -y
rm yarn.lock
yarn install

yarn set version latest
