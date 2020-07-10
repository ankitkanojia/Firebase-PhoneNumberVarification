import React, { Component } from 'react';
import "./custom.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="login">
          <h3 className="text-center text-white pt-5">Firebase - Phone Number Authentication</h3>
          <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
              <div id="login-column" className="col-md-6">
                <div id="login-box" className="col-md-12">
                  <form className="form" method="post">
                    <h3 className="text-center text-info">Login</h3>
                    {!this.state.OTPSent && <div className="form-group">
                      <label htmlFor="phone" className="text-info">Phone:</label><br />
                      <input onChange={this.handlePhoneChange} type="tel" maxLength={13} required name="phone" value={this.state.phone} id="phone" className="form-control" placeholder="Enter Phone Number" />
                    </div>}
                    {this.state.OTPSent && <div className="form-group">
                      <label htmlFor="password" className="text-info">OTP:</label><br />
                      <input onChange={this.handleCodeChange} maxLength={6} required name="OTP" id="OTP" value={this.state.verificationCode} className="form-control" placeholder="Enter OTP" />
                    </div>}
                    <div className="form-group">
                      <input type="submit" name="submit" className="btn btn-info btn-md" value={this.state.OTPSent ? "Submit" : "Send OTP"} />
                    </div>
                    <div ref={ref => this.recaptchaWrapperRef = ref}>
                      <div id="recaptcha-container"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;