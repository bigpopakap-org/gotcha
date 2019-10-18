import React, { Component, ReactNode } from 'react';

import DefaultLayout from 'layouts/DefaultLayout';

export default class OtherPage extends Component<{}, {}> {
  render(): ReactNode {
    return (
      <DefaultLayout>
        <h1>This is another page</h1>
      </DefaultLayout>
    );
  }
}
