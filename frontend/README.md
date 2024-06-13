# townTaste-app BACKEND

<!-- COMMAND INSTRUCTIONS FOR DEVs -->
<!-- NOTE: Always check the official library's documentation -->

# initialize React Native project with Expo and TypeScript:

npx create-expo-app@latest --template

# install Nativewind to style the project:

npm install nativewind
npm install --save-dev tailwindcss@3.3.2

# if you want to ensure typescript is installed on project:

npm install @types/react @types/react-native

# installing react navigation (using stack):

npm install @react-navigation/native
npm install @react-navigation/stack
npm install @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

# using formik to validate forms and yup to send error messages to user:

npm i formik yup

# To insert a SVG file in a RN project:

npm install react-native-svg
npm install react-native-svg-transformer

create a metro.config.js file in the root of the project:

```javascript
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };
})();
```

# Forgot Password feature explanation:

1.The user forgets their password and clicks the "Forgot my password" button on the login screen, navigating to the ForgotPassword screen.

    In this screen the user must insert his email and click the "Send Reset Code" button.

        When clicked the buttton, handleForgotPassword function will be call.
        It will get the email from the input and dispatch to the _passwordResetTokenAction_ Redux.
        This function has also the .unwrap() method which allows to handle with asyncronous operation in a straightforward way, getting directly the payload or throw an error.
        Also, the handleForgotPassword will handle setSubmitting and setErrors functions (to know when got an error and when the form submission is complete);
        The user's email is validated (via Yup schema validation);
        Being accepted, the user is redirected to ResetPassword screen with his email as parameter.

            passwordResetTokenAction:
            Is an asyncronous action (createAsyncThunk) in Redux which handles the ForgotPasswordResponse (the type of the data received if is fulfilled - the email), ForgotPasswordUser (the type of data that it will be dispatch - the token/code) and the rejectValue (message and errorCode in case the response is rejected).
            This function has two arguments (userData - the data passed which is the email; and thhunkAPI - an object to handle the action lifecycle).
            It will call the _forgotPasswordUser_ function with userData as paremeter and return the response.
            In case it gets an error, the thunkAPI is used with rejectWithValue to handle the error.

                forgotPasswordUser:
                Also an asyncronous operation which will be the connection with the backend logic. It will pass data (email) as a parameter to the backend;
                Axios send a POST request to the endpoint with the data;

                    auth/forgot-password:
                    endpoint router to call the _requestPasswordReset_ function in the backend;

                    requestPasswordReset:
                    It gets the email passed through req.body;
                    Checks if the email is register in the DB;
                    Create _code_ variable to generate a code by createResetToken function with user.id as parameter;
                    Calls sendResetPasswordEmail function with email and code as parameters;

                        createResetToken:
                        Function that creates a 4 digits code using Math.random();
                        After create, it sends the code to the passwordResetToken object model in Prisma and generates a new _expiresAt_ property (making the code valid for 1 hour);
                        Returns the code.

                        sendResetPasswordEmail:
                        Is a function service that receives the email and the code and send it to the user's email through nodemailer.

        Now that the user's email was validated and the token sent to his email, he is redirected to the ResetPassword screen with the email as parameter:
        In this screen the user must insert the code, the new password and a confirm passsword;
        When click the button Reset Password, _handleResetPassword_ function will be call;

        handleResetPassword:
        Gets the values (email, code and newPassword) and dispatch to the _resetPasswordAction_ Redux;
        This function has also the .unwrap() method;
        If the assyncronous operation succeed, it send an Alert with a successfully message and navigates to the Login screen;
        If it gets an error, will send an error message;

            resetPasswordAction:
            Asyncronous operation (createAsyncThunk) in Redux with 3 generics (void, ResetPasswordData, and  rejectValue)
            Void - the type of the fulfilled payload, which in this case there is no payload because there is no need to send any data in response;
            ResetPasswordData - the type of the data it will receive (email, code and newPassword);
            RejectValue - message and errorCode in case the response is rejected;
            This function has two arguments (data and thunkAPI)
            Data - Is the email, code and newPassword;
            ThhunkAPI - an object to handle the action lifecycle (it offers several utilities such as dispatch, getState, rejectWithValue, abort, unwrap, requestId);
            It will call the resetPasswordUser function with data as paremeter.
            In case it gets an error, the thunkAPI is used with rejectWithValue to handle the error.


                resetPasswordUser:
                Also an asyncronous operation which will be the connection with the backend logic. It will pass data (email, code and newPassword) as a parameter to the backend;
                Axios send a POST request to the endpoint with the data;

                    auth/reset-password:
                    Endpoint router to call the _resetPassword_ function in the backend;

                    resetPassword:
                    It gets the email, code and newPassword passed through req.body;
                    It validates the data through _validateResetPassword_ function using Zod library validation;
                    It checks if the email is registered in the DB (if the user exists);
                    It creates _isValidCode_ variable which will call the _validateResetCode_ service to check if the code is valid;

                        validateResetCode:
                        Asyncronous operation that receives the userId and the code as parameters;
                        It creates _savedToken_ variable which checks in the passwordResetToken object model in Prisma if the userId and the token (code) exist and belong to the same object;
                        If _savedToken_ is true and the property expiresAt is still valid, it returns true;

                    Being true, it will hash the newPassword using bcrypt through the _hashedPassword_ variable;
                    It will find the user object model using user.id and update new password;
                    After the password being updated, we can delete the passwordResetToken object model, because the token is not necessary anymore (and shouldn't be valid);
                    It returns a successfully message and the reset password logic is complete!

# Max Attempts feature explanation:

1.The user will try to login with an incorrect password in the Login Screen.

2.In the Login Screen, the function handleLogin will receive the values email and password and will dispatch these data to loginAction Redux.

3.The loginAction will send the data to loginUser Service, which will handle the connection between frontend and backend.

4.The loginUser will make a POST request to auth/login backend route sending the data.

5.The /login route has the _checkLoginAttempts_ middleware which will check the number of attempts left, and has the _login_ controller which does the logic and validation.

6.This middleware first checks if the user's email exists in the database:

    If there is no user, it returns "user not found.";
    If there is user: It creates a _now_ variable (used to calculate the time to the user try to login again if he gets the maximum attempts), _maxAttempts_ variable (to calculate how many attempts the user did in sequence) and _attemptsLeft_ variable (to calculate how many attempts he still can do);
    If there is a registered user's email: it will check if the number of attempts _loginAttempts_ is higher than the _maxAttempts_ and if there is a _lastAttempt_ to validate that the user did tryied at least once;

        If these two validations are true: it creates a _lastAttemptTime_ variable wich will register the time of the last user's attempt. Then, creates a _timeDifference_ variable, calculating the current time less the time of the last attempt (_lastAttemptTime_).
        If _timeDifference_ is less than 60 seconds: it returns status 429 (too many requests), not allowing the user to try to login and setting _attemptsLeft_  to 0.

            If this is not true (_timeDifference_ is higher than 60s): the user object is update, finding the user through his email and setting _loginAttempts_ to 0 and _lastAttempt_ to null; Also it sets _attemptsLeft_ to _maxAttempts_.

    After all that, it sends the _attemptsLeft_ to the body, doing the login attempts check.

    NOTE: _loginAttempts_ and _lastAttempt_ are properties of User's Model created specific to validate this feature;

7.The _login_ controller gets the _attemptsLeft_ from req.body.

    It will compare the password inserted by the user with the password in the DB.

        if the password is incorrect, it will find the user by the user's ID and will update the _loginAttempts_ (incrementing 1) and the _lastAttempt_ to the current time. Also, it will show the message on screen with how many attempts left the user still can try.
        if the password is valid, the user object is updated with _loginAttempts_ to 0 and _lastAttempt_ to null.

8.After the backend response, we get back to the _loginUser_ service in frontend.

    If we got an error in the response:

        If the response was a status 429, it will send the message "Too many login attempts, try after 1 min".
        If status is not 429, and there is at least one attempt (_attemptsLeft !== undefined): it will show a message with how many attempts left the user can do".

# Features to do:

change ANY types
reset password through sms code
validate if email exists (email verification)
if the user request a second verification code for reset password, the older one wont be valid anymore (just accept the newer one)
Splashscreen