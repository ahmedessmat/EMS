import React, { Component } from 'react';
import bgDesktop from '../assets/images/header-bg.jpg';
import bgMobile from '../assets/images/header-bg.jpg';
import graph from '../assets/images/graph.png';
// import section from '../assets/images/section-img.jpg'
// import section1 from '../assets/images/section-img1.jpg'
// import section3 from '../assets/images/section-img3.jpg'
// import section2 from '../assets/images/section-img2.jpg'
// import section4 from '../assets/images/section-img4.jpg'
// import section5 from '../assets/images/section-img5.jpg'
// import section6 from '../assets/images/section-img6.jpg'
// import member1 from '../assets/images/member1.png'
// import member2 from '../assets/images/member2.png'
import about1 from '../images/About1.jpeg';
import about2 from '../images/About2.jpeg';
import about3 from '../images/About3.jpeg';
import about4 from '../images/About4.jpeg';

class Home extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <div class="header-section">
          <img src={bgDesktop} class="header-image" />
          <img src={bgMobile} class="mob-header-image" />
          <div class="image-info">
            <p style={{ fontSize: 24 }} class="image-line">
              Ever tried. Ever failed. <small>No</small> matter. …
            </p>
            <p style={{ fontSize: 52 }} class="image-line-2">
              Welcome to
              <br />
              <small>Fady ElFahdy</small>
              <br />
              Website
            </p>
            <a style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/book')}>
              <p style={{ fontSize: 24 }} class="image-line-3">
                Book a Course{' '}
                <small>
                  <i class="fas fa-arrow-right"></i>
                </small>
              </p>
            </a>
          </div>
        </div>
        <section class="about-section">
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-12 text-center">
                <p class="section-title">Our Methodology</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-12 text-center">
                <p class="section-text">
                  I know what you are thinking; “How would this time be any different, why should I
                  try again or even, “Is it worth it?” The hardest part about becoming successful at
                  tests like the IGCSE ESL is not taking them, the hardest part is challenging
                  yourself to become someone who better understands what is required for the test
                  and the ability to wield a comfortable level of English to handle this and other
                  tests with ease.
                </p>
                <p class="section-text">
                  This is what we teach here. That is why this time is different.
                </p>
                <p class="section-text">
                  By applying the most developed and nuanced methodologies in teaching and
                  developing easy to follow and measure progression charts, we are confident that
                  our students can obtain the scores that they seek. We invest the time and energy
                  into your success because your goals and your story matter to us.
                </p>
                <p class="section-text">I ask you this time; is it worth it not to try?</p>
                <p class="section-text">
                  Come and take an evaluation test today and see where you stand as you continue
                  your English learning journey with us.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class="graph-section">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <img src={graph} class="side-image" />
              </div>
              <div class="col-md-5 offset-md-1">
                <p class="side-title">tagline</p>
                <p class="side-subtitle">
                  Many of life's failures are people who did not realize how close they were to
                  success when they gave up.
                </p>
                <br />
                <p class="side-text">--Thomas Edison (1874-1931), inventor of the light bulb</p>
                {/* <div class="row">
						<div class="col-md-6 col-6">
							<ul class="side-list">
								<li>Aliquam</li>
								<li>Phasellus</li>
							</ul>
						</div>
						<div class="col-md-6 col-6">
							<ul class="side-list">
								<li>Integer</li>
								<li>Scelerisque</li>
							</ul>
						</div>
					</div>					 */}
              </div>
            </div>
          </div>
        </section>
        <section class="gallery-section">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <p class="section-title">Gallery</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-center"></div>
            </div>
            <section class="about-gallery">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <div class="main2">
                      <div class="item-7">
                        <img src={about3} />
                      </div>
                      <div class="item-8">
                        <img src={about4} />
                      </div>

                      <div class="item-5">
                        <img src={about1} />
                      </div>

                      <div class="item-6">
                        <img src={about2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        {/* <section class="testimonial-section">
		<div class="container">
			<div class="row">
				<div class="col-md-12 text-center">
					<p class="section-title">Testimonial</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6 col-12">
					<div class="card">
						<img src={member1} class="card-image rounded-circle"/>
						<div class="testimonial-card">
							<p class="card-title">Samar mohamed</p>
							<p class="card-info">Suspendisse in justo mauris. Morbi vitae lectus est. Pellentesque commodo nisi id erat pretium, sit amet facilisis orci condimentum. Nam urna diam, pulvinar ut purus</p>
						</div>
					</div>
				</div>
				<div class="col-md-6 col-12">
					<div class="card">
						<img src={member2} class="card-image rounded-circle"/>
						<div class="testimonial-card">
							<p class="card-title">Samar mohamed</p>
							<p class="card-info">Suspendisse in justo mauris. Morbi vitae lectus est. Pellentesque commodo nisi id erat pretium, sit amet facilisis orci condimentum. Nam urna diam, pulvinar ut purus</p>
						</div>
					</div>
				</div>
			</div>
			<br/>
			<div class="row">
				<div class="col-md-4 offset-md-4">
					<form class="email-form">
					    <div class="input-group mb-3 section-form">
					      <input type="text" class="form-control" placeholder="Your email" id="email" name="email"/>
					      <div class="input-group-append">
					        <span class="input-group-text mail-box"><i class="fab fa-telegram-plane"></i></span>
					      </div>
					    </div>
			  		</form>
			  	</div>
			</div>
		</div>
	</section> */}
      </div>
    );
  }
}

export default Home;
