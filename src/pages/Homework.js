import React, { Component } from 'react';
import AppCard from './../components/AppCard';

import card201 from './../assets/card201.png';
import card202 from './../assets/card202.png';
import card203 from './../assets/card203.png';
import card204 from './../assets/card204.png';

class Homework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [
        {
          cardImg: card201,
          cardTitle: 'Title!',
          cardSubtitle: 'Subtitle',
          cardText:
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
          cardGrade: '70/100',
          cardLinkText: 'View Results',
          cardLink: '',
          isVideo: false,
        },
        {
          cardImg: card202,
          cardTitle: 'Title!',
          cardSubtitle: 'Subtitle',
          cardText:
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
          cardGrade: 'Expire 20/08/2020',
          cardLinkText: 'Start Homework',
          cardLink: '',
          isVideo: false,
        },

        {
          cardImg: card203,
          cardTitle: 'Title!',
          cardSubtitle: 'Subtitle',
          cardText:
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
          cardGrade: '50/100',
          cardLinkText: 'View Results',
          cardLink: '',
          isVideo: false,
        },
        {
          cardImg: card204,
          cardTitle: 'Title!',
          cardSubtitle: 'Subtitle',
          cardText:
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
          cardGrade: 'Expire 05/09/2020',
          cardLinkText: 'Start Homework',
          cardLink: '',
          isVideo: false,
        },
        {
          cardImg: card201,
          cardTitle: 'Title!',
          cardSubtitle: 'Subtitle',
          cardText:
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
          cardGrade: '70/100',
          cardLinkText: 'View Results',
          cardLink: '',
          isVideo: false,
        },
        {
          cardImg: card202,
          cardTitle: 'Title!',
          cardSubtitle: 'Subtitle',
          cardText:
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
          cardGrade: 'Expire 20/08/2020',
          cardLinkText: 'Start Homework',
          cardLink: '',
          isVideo: false,
        },

        {
          cardImg: card203,
          cardTitle: 'Title!',
          cardSubtitle: 'Subtitle',
          cardText:
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
          cardGrade: '50/100',
          cardLinkText: 'View Results',
          cardLink: '',
          isVideo: false,
        },
        {
          cardImg: card204,
          cardTitle: 'Title!',
          cardSubtitle: 'Subtitle',
          cardText:
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
          cardGrade: 'Expire 05/09/2020',
          cardLinkText: 'Start Homework',
          cardLink: '',
          isVideo: false,
        },
        {
          cardImg: card201,
          cardTitle: 'Title!',
          cardSubtitle: 'Subtitle',
          cardText:
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
          cardGrade: '70/100',
          cardLinkText: 'View Results',
          cardLink: '',
          isVideo: false,
        },
        {
          cardImg: card202,
          cardTitle: 'Title!',
          cardSubtitle: 'Subtitle',
          cardText:
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
          cardGrade: 'Expire 20/08/2020',
          cardLinkText: 'Start Homework',
          cardLink: '',
          isVideo: false,
        },

        {
          cardImg: card203,
          cardTitle: 'Title!',
          cardSubtitle: 'Subtitle',
          cardText:
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
          cardGrade: '50/100',
          cardLinkText: 'View Results',
          cardLink: '',
          isVideo: false,
        },
        {
          cardImg: card204,
          cardTitle: 'Title!',
          cardSubtitle: 'Subtitle',
          cardText:
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
          cardGrade: 'Expire 05/09/2020',
          cardLinkText: 'Start Homework',
          cardLink: '',
          isVideo: false,
        },
      ],
    };
  }

  componentDidMount() {
    if (!this.props.user && !sessionStorage.getItem('user')) {
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div>
        {/* <HeaderNav /> */}
        <div className="headerMargin"></div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-11">
              <h3 className="text-primary mt-5 mb-3">Homework</h3>
              <div className="row justify-content-center">
                {this.state.cardData.map((singleCard, i) => (
                  <div className="col-12 col-lg-3">
                    <AppCard cardData={singleCard} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <AppFooter /> */}
      </div>
    );
  }
}

export default Homework;
