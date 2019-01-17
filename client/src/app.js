const React = require('react');
const AverageReviews = require('./average_reviews');
const ReviewArea = require('./review_area')
const Switch = require('react-router-dom').Switch

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            averageScore: 0,
            numberStars: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
            },
            filteredReviews: [],
            showLimited: true
        }
        this.handleNumberStarsClick = this.handleNumberStarsClick.bind(this);
        this.showAllReviews = this.showAllReviews.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleHelpful = this.handleHelpful.bind(this);
    }

    componentDidMount() {
        let test = window.location.href;
        console.log(test)
        test = test.split('/');
        product = test[test.length-2];

        fetch('http://localhost:3001/reviews/all/' + product).then((data) => {
            data.json().then((results) => {
                let newState = Object.assign({}, this.state);
                for (let i = 0; i < results.length; i++) {
                    newState.reviews.push(results[i]);
                    newState.filteredReviews.push(results[i]);
                    newState.averageScore += results[i].score;
                    newState.numberStars[results[i].score] += 1;
                }
                newState.averageScore = newState.averageScore / newState.reviews.length;
                this.setState(newState);
            })
        })
    }

    handleHelpful(value) {
        console.log(value)
        let newState = Object.assign({}, this.state);
        for (let i = 0; i < newState.reviews.length; i++) {
            if (newState.reviews[i].id === value) {
                console.log(true);
                newState.reviews[i].found_helpful += 1;
                newState.filteredReviews = newState.reviews;
                this.setState(newState);
                fetch('http://localhost:3001/reviews/helpful/' + value, {
                    method: 'POST',
                });
            }
        }
    }

    handleNumberStarsClick(value) {
        let newState = Object.assign({}, this.state);
        let tempArray = [];
        for (let i = 0; i < newState.reviews.length; i++) {
            if (newState.reviews[i].score === value) {
                tempArray.push(newState.reviews[i]);
            }
        }
        newState.filteredReviews = tempArray;
        console.log(newState.filteredReviews);
        this.setState(newState);
    }

    showAllReviews() {
        let newState = Object.assign({}, this.state);
        newState.showLimited = false;
        this.setState(newState);
    }

    handleSort(event){
        let newState = Object.assign({}, this.state);
        for (let i = 0; i < event.currentTarget.children.length; i++) {
            if (event.currentTarget.children[i].selected === true) {
                const thisValue = event.currentTarget.children[i].value
                if (thisValue === "one") {
                    newState.reviews.sort((a,b)=> {
                        if (a.found_helpful > b.found_helpful) {
                            return -1
                        } else {
                            return 1
                        }
                    });
                } else {
                    newState.reviews.sort((a,b)=> {
                        firstDateArray = a.review_date.split('-');
                        firstDate = ([firstDateArray[0], firstDateArray[1], firstDateArray[2].slice(0,2)]).join('');
                        firstDateNumber = Number(firstDate);
                        secondDateArray = b.review_date.split('-');
                        secondDate = ([secondDateArray[0], secondDateArray[1], secondDateArray[2].slice(0, 2)]).join('');
                        secondDateNumber = Number(secondDate);
                        if (firstDateNumber > secondDateNumber) {
                            return -1
                        } else{
                            return 1
                        }
                    })
                    console.log(this.state.reviews);
                }
            }
        }
        newState.filteredReviews = newState.reviews;
        this.setState(newState);
    }
    render() {
        return (
            <div className="mainApp" style={{ paddingLeft: "18px", paddingRight: "18px", paddingBottom: "18px", }}>
                <hr className="reviewBorderLine"></hr>
                <div className="reviewGrid">
                    <div className="leftReviewGrid">
                        <AverageReviews numberStarsClick={this.handleNumberStarsClick} averageScore={this.state.averageScore} numberStars={this.state.numberStars} numberReviews={this.state.reviews.length} />
                    </div>
                    <div className="rightReviewGrid" style={{ paddingLeft: "17.188px", }}>
                        <ReviewArea helpful={this.handleHelpful} handleSort={this.handleSort}reviews={this.state.filteredReviews} limited={this.state.showLimited} extend={this.showAllReviews} />
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = App;