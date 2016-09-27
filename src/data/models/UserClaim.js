/**
 * OpenClub (https://www.openclub.com.au/)
 *
 * Copyright © 2016 OpenClub Holdings, PTY LTD. All Rights Reserved.
 *
 * This source code is proprietary software belonging to OpenClub Holdings PTY LTD
 * and is licensed for use by OpenClub PTY LTD.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const UserClaim = Model.define('UserClaim', {

  type: {
    type: DataType.STRING,
  },

  value: {
    type: DataType.INTEGER,
  },

});

export default UserClaim;
