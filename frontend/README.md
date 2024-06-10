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
remove navigation header from authentication pages (login, signup...)
Splashscreen
