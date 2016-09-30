/**
 * OpenClub (https://www.openclub.com.au/)
 *
 * Copyright © 2016 OpenClub Holdings, PTY LTD. All Rights Reserved.
 *
 * This source code is proprietary software belonging to OpenClub Holdings PTY LTD
 * and is licensed for use by OpenClub PTY LTD.
 */

import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import content from './content';
import error from './error';

export default {

  path: '/',
  children: [
    home,
    content,
    error,
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};
