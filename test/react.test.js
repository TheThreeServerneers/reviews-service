import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import React from 'react';
import App from './../client/src/app.js';
import Review from './../client/src/review.js';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders an App component', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find('.mainApp')).toHaveLength(1);
  });
});

describe('<Review />', () => {
  it('renders a Review component', () => {
    const sampleReview = {
      found_helpful: 6,
      id: 11,
      is_verified: true,
      product_id: 1,
      review_date: "2016-07-26T07:00:00.000Z",
      review_text: "Ullam sit et eos praesentium enim reprehenderit est sunt ipsum. Nam enim voluptate magnam nostrum quibusdam.",
      score: 5,
      title: "voluptas nihil dolores",
      username: "Karen38"
    }
    const wrapper = shallow(<Review review={sampleReview} key={sampleReview.id}/>);
    expect(wrapper.find('.singleReviewWrapper')).toHaveLength(1);
  })
})
