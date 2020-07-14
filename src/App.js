import React, { Component } from 'react';
import "./custom.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import "./firebase-context";
import firebase from 'firebase';

const customStyle = {
  inputStyle: {
    width: "100%"
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OTPSent: false,
      confirmResult: null,
      verificationCode: "",
      inProgress: false
    }
  }

  captchaInit = () => {
    if (this.applicationVerifier && this.recaptchaWrapperRef) {
      this.applicationVerifier.clear()
      this.recaptchaWrapperRef.innerHTML = `<div id="recaptcha-container"></div>`
    }

    this.applicationVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible"
      }
    );
  }

  handleSendCode = (event) => {
    event.preventDefault();

    // Request for captcha initialization
    this.captchaInit();

    this.setState({
      inProgress: true
    });

    // Request to send OTP
    firebase.auth().signInWithPhoneNumber("+" + this.state.phone, this.applicationVerifier)
      .then(confirmResult => {
        this.setState({
          confirmResult,
          OTPSent: true,
          inProgress: false
        });
      })
      .catch(error => {
        this.captchaInit();
        this.setState({
          inProgress: false
        });
        alert(error.message);
      })
  }

  handleVerifyCode = (event) => {
    event.preventDefault();

    // Request for OTP verification
    const { confirmResult, verificationCode } = this.state
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          this.setState({
            OTPSent: false,
            userDetails: user,
            phone : "",
            verificationCode: "",
            inProgress : false
          });

          // Here you can write the code for redirection to specific page
          alert("Hurray, Your OTP is verified successfully..!!!!");
        })
        .catch(error => {
          alert(error.message)
        })
    } else {
      alert("Please enter a 6 digit OTP code.");
    }
  }

  reSendCode = () => {
    // Re-initialize captcha code
    this.captchaInit();

    // Request to send OTP
    firebase.auth().signInWithPhoneNumber("+" + this.state.phone, this.applicationVerifier)
      .then(confirmResult => {
        this.setState({
          confirmResult,
          OTPSent: true,
          inProgress: false
        });
      })
      .catch(error => {
        this.captchaInit();
        this.setState({
          inProgress: false
        });
        alert(error.message);
      })
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
                      {/* <input data-format="+1 (ddd) ddd-dddd" type="tel" maxLength={13} required name="phone" value={this.state.phone} id="phone" className="form-control" placeholder="Enter Phone Number" /> */}
                      <PhoneInput
                        disabled={this.state.inProgress} 
                        className="form-control"
                        country={'in'}
                        value={this.state.phone}
                        required={true}
                        autoFocus={true}
                        onChange={phone => this.setState({ phone })}
                      />
                    </div>}
                    {this.state.OTPSent && <div className="form-group">
                      <label htmlFor="password" className="text-info">OTP:</label><br />
                      <input disabled={this.state.inProgress}  onChange={e => this.setState({ verificationCode: e.target.value })} maxLength={6} required={this.state.OTPSent} name="OTP" id="OTP" value={this.state.verificationCode} className="form-control" placeholder="Enter OTP" />
                    </div>}
                    <div className="form-group">
                      {this.state.OTPSent && <label onClick={this.reSendCode}><a href="#">Re-send Code</a></label>}
                      <input align="right" type="submit" name="submit" className="btn btn-info btn-md" disabled={this.state.inProgress} value={this.state.inProgress ? "Please wait!!!" : this.state.OTPSent ? "Submit" : "Send OTP"} style={{ float: "right" }} onClick={this.state.OTPSent ? this.handleVerifyCode : this.handleSendCode} />
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