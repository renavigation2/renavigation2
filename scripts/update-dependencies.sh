#!/bin/sh

update () {
    npx ncu --packageFile "$1/package.json" -u
    npx ncu --packageFile "$1/package.json" -u --dep dev
}

yarn workspaces info | awk '/location/ {print $2}' | while read package; do
    package="${package//\"}"
    package="${package//,}"
    update "$package"
done

update "."

yarn clean -y
rm yarn.lock
yarn install
