import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { decorateAction } from '@kadira/storybook-addon-actions';
import { withKnobs, boolean, number } from '@kadira/storybook-addon-knobs';

import ShareBtn from '../components';

const firstArg = decorateAction([
  args => args.slice(0, 1)
]);

const stories = storiesOf('App', module)

const text = 'Take a look at this Property on Housing.com'
const url = 'https://housing.com/in/buy/projects/page/7096-mangalam-heights-by-mangalam-developers-in-kharghar'
stories.addDecorator(withKnobs)

stories
  .add('default', () => (
    <ShareBtn
          url={url}
          text={text}
          className='ib'
          displayText='Share'
        />
  ));
