import React from 'react';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import Profile from '.';

// ==================================
// mocks
// ==================================
jest.mock('@components', () => ({
  Box: (props) => <div id="Box" {...props} />,
  Avatar: (props) => <div id="Avatar" {...props} />,
  Tag: (props) => <div id="Tag" {...props} />,
  InfoPopover: (props) => <div id="InfoPopover" {...props} />,
  Markdown: (props) => <div id="Markdown" {...props} />,
}));

jest.mock('../../contexts/account', () => ({
  useAccountContext: () => {
    return ({
      uiData: {
        profile: {
          operatorAddress: 'operatorAddress',
          selfDelegateAddress: 'selfDelegateAddress',
          website: 'website',
          validator: {
            moniker: 'moniker',
          },
          status: 'active',
          description: 'description',
          condition: 'active',
        },
      },
    });
  },
}));

// ==================================
// unit tests
// ==================================
describe('screen: ValidatorDetails/Profile', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <MockTheme>
        <Profile />
      </MockTheme>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
