// @flow
import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

const FormattedDatetime = (props: Object) => (
    <span>
        <FormattedDate {...props} /> <FormattedTime {...props} />
    </span>
);

export default FormattedDatetime;
