import React, { Component, ReactNode } from 'react';

import DefaultLayout from 'layouts/DefaultLayout';

export default class LandingPage extends Component<{}, {}> {
  render(): ReactNode {
    return (
      <DefaultLayout>
        <h1>Welcome!</h1>
      </DefaultLayout>
    );
  }
}
