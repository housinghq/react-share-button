#react-share-button

> A lightweight React Share Button for mobile web with web share api integration, native intent support and fallback.


##Features

1. Web Share Api 
1. Share Modal Fallback for other browsers 
1. Share via Whatsapp, FB, Twitter, Mail or Copy on Clipboard

## Installation

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
onShareBtnClick| () => {} |A callback function when share button is clicked
sharedBy| (medium) => {console.log('shared via ', medium)}|A callback function when user clicks on any share medium from share modal


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
