/**
 * OpenClub (https://www.openclub.com.au/)
 *
 * Copyright © 2016 OpenClub Holdings, PTY LTD. All Rights Reserved.
 *
 * This source code is proprietary software belonging to OpenClub Holdings PTY LTD
 * and is licensed for use by OpenClub PTY LTD.
 */

import UserType from '../types/UserType';

const me = {
  type: UserType,
  resolve({ request }) {
    return request.user && {
      id: request.user.id,
      email: request.user.email,
    };
  },
};

export default me;
