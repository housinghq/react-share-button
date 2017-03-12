#react-share-button

> A lightweight React Share Button for mobile web with web share api integration, native intent support and fallback.


##Features

1. Web 
1. AutoPlay
1. Drag and swipe

## Installation
This library works with [react-lazy-card](https://github.com/housinghq/react-lazy-card) (don't
worry. they are very light even when used together . react-lazy-card may serve other purposes in the app so we separated it).

```
npm install --save react-photostory react-lazy-card
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

### &lt;Swipe/&gt; Component

prop|default|description
----|-------|-----------
className|''|Custom classname
initialIndex|0|initially visible slide index
autoPlay|false|whether to display slide show or not
overScan|0|Number of Slide offsets to load excluding the current slide.If its 1 it will load current, current+-1
onSwipe|({initialIndex, currentIndex})| function executed whenever the current slide changes
onClick|{index}|function executed when a slide is clicked
prev|&lt;button&gt;PREV&lt;/button&gt;|React element to replace the PREV button
next|&lt;button&gt;NEXT&lt;/button&gt;|React element to replace the NEXT button
threshold|0.5|Ratio of carousel width one should drag to make successful swipe
responsive|false|whether or not to listen to window resize event
renderFirst|true|don't lazy load the initial slide


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
