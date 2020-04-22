# Avataaars server-side rendering

This is a fork of [gkoberger/avataaars](https://github.com/gkoberger/avataaars), heavily simplified and without the AWS storage, a little bit of cleanup and the use of localstorage for caching (and of course, a little bit of magic 🧙‍♂️).

## Usage

You can receive an SVG by calling directly the endpoint root:

`/?hairColor=BrownDark&clotheType=Hoodie&avatarStyle=Circle`

Or you can also receive a PNG file making a call to `/png/{width}` (width is optional):

`/png?hairColor=BrownDark&clotheType=Hoodie&avatarStyle=Circle`

`/png/256?hairColor=BrownDark&clotheType=Hoodie&avatarStyle=Circle`

## Configuration

You can build your query strings here:

https://getavataaars.com/

## Build

```console
$ npm install
$ npm start
```

Most of the good stuff is in `app.js`!
