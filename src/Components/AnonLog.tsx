import AWS from "aws-sdk"

const AnonLog = () => {
  AWS.config.region = process.env.REACT_APP_REGION as string;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_POOLID as string,
  })
}

export default AnonLog;