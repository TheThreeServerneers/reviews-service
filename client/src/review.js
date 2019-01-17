const React = require('react');

const Review = function (props) {
    let dateConverter = function (oldDate) {
        if (oldDate !== undefined) {
            const monthObject = {
                "01": "January",
                "02": "February",
                "03": "March",
                "04": "April",
                "05": "May",
                "06": "June",
                "07": "July",
                "08": "August",
                "09": "September",
                "10": "October",
                "11": "November",
                "12": "December"
            }
            let dateArray = oldDate.toString().split('-');
            let month = monthObject[dateArray[1]];
            let day = dateArray[2].slice(0, 2);
            let dayAddon = 'th';
            if (day[0] === "0" && day[1] === "1") {
                dayAddon = 'st';
            }
            if (day[0] === "0" && day[1] === "2") {
              dayAddon = 'nd';
            }
            if (day[0] === "0" && day[1] === "3") {
                dayAddon = 'rd'
            }
            if (day[0] === "0") {
                day = day.slice(1);
            };
            let year = dateArray[0];
            return (month + ' ' + day + dayAddon + ', ' + year);
        }
    }
    const score = props.review.score;
    let starUrl = 'https://s3.us-east-2.amazonaws.com/publicreviewsmodule/onestar.png';
    if (score === 2) {
        starUrl = 'https://s3.us-east-2.amazonaws.com/publicreviewsmodule/twostar.png';
    } else if (score === 3) {
        starUrl = 'https://s3.us-east-2.amazonaws.com/publicreviewsmodule/threestar.png';
    } else if (score === 4) {
        starUrl = 'https://s3.us-east-2.amazonaws.com/publicreviewsmodule/fourstar.png';
    } else if (score === 5) {
        starUrl = 'https://s3.us-east-2.amazonaws.com/publicreviewsmodule/fivestar.png';
    }
    let preDate = props.review.review_date;
    let reviewDate = dateConverter(preDate);
    let isVerified;
    if (props.review.is_verified) {
        isVerified = "Verified Purchase";
    }
    let personOrPeople = "people";
    if (props.review.found_helpful === 1) {
        personOrPeople = "person";
    }
    return (
        <div className="singleReviewWrapper">
            <div className="singleReviewUsernameAndPicture">
                <img src={"https://s3.us-east-2.amazonaws.com/publicreviewsmodule/profilepic.png"} className="userProfilePic"></img>
                <span className="singleReviewUsername">
                    {props.review.username}
                </span>
            </div>
            <div className="ratingAndTitle">
                <img src={starUrl} className="singleReviewStar"></img>
                <span className="singleReviewTitle">{props.review.title}</span>
            </div>
            <div className="reviewDate">{reviewDate}</div>
            <div className="verificationWrapper">
                <div className="reviewTextSeparator">|</div>
                <div className="reviewVerification">{isVerified}</div>
            </div>
            <div className="reviewText">{props.review.review_text}</div>
            <div className="reviewComments">
                <div className="reviewHelpful">{props.review.found_helpful + " " + personOrPeople + " found this review helpful"}</div>
                <div className="helpfulButtonOuter" >
                    <div className="helpfulButtonInner" onClick={() => { props.helpful(props.review.id) }}>
                        Helpful
                </div>
                </div>
                <div className="reviewTextSeparator">|</div>
                <div className="singleReviewCommentReport">Comment</div>
                <div className="reviewTextSeparator">|</div>
                <div className="singleReviewCommentReport">Report Abuse</div>
            </div>
        </div>
    )
}

module.exports = Review;