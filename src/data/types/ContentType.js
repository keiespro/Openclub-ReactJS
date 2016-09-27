/**
 * OpenClub (https://www.openclub.com.au/)
 *
 * Copyright © 2016 OpenClub Holdings, PTY LTD. All Rights Reserved.
 *
 * This source code is proprietary software belonging to OpenClub Holdings PTY LTD
 * and is licensed for use by OpenClub PTY LTD.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const ContentType = new ObjectType({
  name: 'Content',
  fields: {
    path: { type: new NonNull(StringType) },
    title: { type: new NonNull(StringType) },
    content: { type: new NonNull(StringType) },
    component: { type: new NonNull(StringType) },
  },
});

export default ContentType;
