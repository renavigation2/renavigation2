#!/bin/sh

rm -rf navigation

git clone https://github.com/grahammendick/navigation.git

rm -rf LICENSE
rm -rf ios
rm -rf android
rm -rf src/navigation

mv navigation/LICENSE .
mv navigation/NavigationReactNative/src/ios .
mv navigation/NavigationReactNative/src/android .
mv navigation/NavigationReactNative/src src/navigation

rm -rf src/navigation/node_modules
rm -rf src/navigation/tsconfig.json
rm -rf navigation

./../../node_modules/.bin/eslint --fix src &> /dev/null

for filename in ./src/navigation/*; do
  echo "/* eslint-disable prefer-const */\n/* eslint-disable @typescript-eslint/no-unused-vars */\n/* eslint-disable react/display-name */\n$(cat $filename)" > $filename
done

git apply patches/navitation-react-native.patch --whitespace=nowarn
