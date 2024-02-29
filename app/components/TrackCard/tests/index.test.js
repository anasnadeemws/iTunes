/**
 *
 * Tests for TrackCard
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import TrackCard from '../index';
import { translate } from '@app/utils/index';

describe('<TrackCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackCard component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackCard />);
    expect(getAllByTestId('repo-card').length).toBe(1);
  });

  it('should render the repository details inside the card', () => {
    const repoName = 'react-template';
    const fullName = 'wednesday-solutions/react-template';
    const stargazersCount = 200;
    const { getByTestId } = renderWithIntl(
      <TrackCard name={repoName} fullName={fullName} stargazersCount={stargazersCount} />
    );
    expect(getByTestId('name')).toHaveTextContent(repoName);
    expect(getByTestId('fullName')).toHaveTextContent(fullName);
    expect(getByTestId('stargazers')).toHaveTextContent(stargazersCount);
  });

  it('should render the repository unavailable messages in case any props are unavailable or have falsy values', () => {
    const repoUnavailable = translate('repo_name_unavailable');
    const fullNameUnavailable = translate('repo_full_name_unavailable');
    const stargazersUnavailable = translate('repo_stars_unavailable');
    const { getByTestId } = renderWithIntl(<TrackCard />);
    expect(getByTestId('name-unavailable')).toHaveTextContent(repoUnavailable);
    expect(getByTestId('fullName-unavailable')).toHaveTextContent(fullNameUnavailable);
    expect(getByTestId('stargazers-unavaiable')).toHaveTextContent(stargazersUnavailable);
  });
});
