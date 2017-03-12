#react-share-button

> A lightweight React Share Button for mobile web with web share api integration, native intent support and fallback.


##Features

1. Web Share Api 
1. Share Modal Fallback for other browsers 
1. Share via Whatsapp, FB, Twitter, Mail or Copy on Clipboard

## Installation
This library works with [react-lazy-card](https://github.com/housinghq/react-lazy-card) (don't
worry. they are very light even when used together . react-lazy-card may serve other purposes in the app so we separated it).

```
npm install --save react-share-button
```

## Basic Usage
**JSX**:
```js
import ShareBtn from 'react-share-button';

<ShareBtn 
  url={url}
  text={text}
  className='ib'
  displayText='Share'
/>
```
**CSS**
```css
@import "react-share-button/dist/ShareBtn"
```

## Options

### &lt;ShareBtn/&gt; Component

prop|default|description
----|-------|-----------
className|''|Custom classnamem, you can style your button with this
url|''|The URL you want to share
text|''|The Text before the URL (E.g. Hey checkout this awesome property!!)
displayText| Share |Any text you wanna write on button like Share Property


### Development
```
git clone https://github.com/housinghq/react-share-button
cd react-share-button
npm install
npm run storybook
```

Open an issue before opening a PR. The UI in this package is for moibile only.

###License
MIT @ Loconsolutions
