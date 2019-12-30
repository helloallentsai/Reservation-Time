import StarEntry from './starEntry.jsx';

const textStyle = {
  color: 'rgb(45, 51, 63)',
  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
  // fontFamily: '"Josefin Sans", serif',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '5px 10px 5px 10px',
  display: 'inline-block',
};

const Review = (props) => (
  <div className='review' role="img" style={{display: 'inline-block'}}>
    <div style={{ display: 'inline-block' }}>{props.review.reviewStars.map((reviewStar, idx) => (
      <StarEntry starEntry={reviewStar} key={idx} />
    ))}
    </div>
    <div style={textStyle}>{parseFloat(props.review._data.review).toFixed(2)}</div>
  </div>
);

export default Review;