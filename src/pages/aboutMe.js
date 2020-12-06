import React, { Component } from 'react';
import about1 from '../images/About1.jpeg';
import about2 from '../images/About2.jpeg';
import about3 from '../images/About3.jpeg';
import about4 from '../images/About4.jpeg';

export default class aboutMe extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <section class="page-section">
          <div class="container">
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <div class="row">
                  <div class="col-md-12 col-12 text-center">
                    <p class="page-title">Welcome to Fady ElFahdy</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-12 text-center">
                    <p class="page-text">
                      Develop success from failures. Discouragement and failure are two of the
                      surest stepping stones to success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
        <section class="story-section">
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-12 text-center">
                <p class="section-title">Our Story</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-12 text-center">
                <p class="section-text">
                  I was just like you. Yes, I know that sounds overly cliché, but it is true. When
                  starting on this journey, I struggled with things like sentence structure and
                  active listening skills. I would pour hours into reviewing vocabulary lists and
                  trying to find which synonyms I could use to stop me from repeating myself. I
                  invested so much time and effort and I felt the weight of defeat when my results
                  didn’t show the scores I knew I so desperately needed.
                </p>
                <p class="section-text">
                  What was I doing wrong? It wasn’t “what” I was studying, it was “how” I was going
                  about studying and what expectations I was setting for myself. Once I knew how to
                  adjust to the optimum level of progression development, I was able to get out of
                  my struggling rut. Within 3 years I went from pacing around waiting for my TEFL
                  results to doing an advanced Delta Training Module.{' '}
                </p>
                <p class="section-text">
                  I am willing to offer you the ability to take your English Test preparation to the
                  next level and obtain the confidence to receive the scores that you wish to
                  achieve. I know those struggles because I have been in your position and I will
                  work with you to help you get out of that position as well.
                </p>
                <p class="section-text">Join us, and let your dreams come true.</p>
              </div>
            </div>
          </div>
        </section>
        <section class="testimonial-section">
          <div class="container">
            <div class="row">
              <div class="col-md-4 offset-md-4">
                <form class="email-form">
                  <div class="input-group mb-3 section-form">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Your email"
                      id="email"
                      name="email"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text mail-box">
                        <i class="fab fa-telegram-plane"></i>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
