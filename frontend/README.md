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

# feature to login with google account:

npm i expo-auth-session expo-crypto expo-web-browser

# steps to enable Google Auth (user login using Google account):

1.Setup Google Cloud project:

    1.1. Create a project at Google Developers Console

    1.2. Enable Google Sign-In API for the project:
        Navigate to "APIs & Services" > "Library" in the left sidebar

        Look for "Google Sign-In API" in the search bar and enable it

        Configure the OAuth Consent Screen:
            Navigate to "APIs & Services" > "OAuth consent screen"

            Choose the user type ("External" for most apps) and click "Create"

            Fill Out the Consent Screen Information
                App name: Enter your app name.
                User support email: Enter your support email.
                App logo: Optionally, upload a logo.
                Developer contact information: Enter your contact email.

            Add Scopes:
                Click "Add or Remove Scopes".
                Add the required scopes (e.g., profile, email).
                Click "Update" and then "Save and Continue".

            Add Test Users (enter email of users who will thest the app)

        Create OAuth 2.0 Client ID:
            "APIs & Services" > "Credentials" in the left sidebar
            Click "Create Credentials" > "OAuth 2.0 Client ID"

    1.3. Configure OAuth Consent Screen
         Create OAuth 2.0 Client ID for Android:
            Application type: Select "Android"

            Name: Enter a name for the credential (e.g., "Android Client")

            Package name: Enter your app's package name. (For project using Expo)
                 In the app.json file, you will find (or need to add) a section for Android-specific configuration under the expo key.

            Get the SHA-1 fingerprint (For project in Expo managed)
                using the terminal: expo login
                 Go to expo.dev website
                  Navigate or create a new project and click Link GitHub repository
                  using the terminal:
                        expo build:android
                        eas credentials
                            Select platform » Android
                            Which build profile do you want to configure? » production
                            Get the SHA1 Fingerprint

        Create OAuth 2.0 Client ID for IOS:
            Application type: Select "iOS".
            Name: Enter a name for the credential (e.g., "iOS Client").
            Bundle ID: Enter your app's bundle ID (find or create one in app.json)

    1.4. Add OAuth Client ID to the App:
        For Android:
            In Google Cloud account, download the file in Android Client
            Place it with the name "google-service.json" in a folder like "android/app" inside the proejct
            Add the "googleServicesFile" configuration in app.json
            insert the file as a secret in the terminal: eas secret:create --name GOOGLE_SERVICES_JSON --type file --value ./frontend/android/google-services.json
            Now that the secret its in the Google Cloud, delete the file from the project
            NOTE: If you add the file as a secret in EAS, you need to remove the googleServicesFile from app.json
            run eas build -p android or eas build -p all (to build android and IOS)

        For IOS:
            In Google Cloud account, download the file in IOS Client
            Place it with the name "GoogleService-Info.plist" in the root of the project
            Find the REVERSED_CLIENT_ID inside the file
            Add the "googleServicesFile" configuration in app.json
            Insert the file as a secrete in the terminal: eas secret:create --name GOOGLE_SERVICE_INFO_PLIST --type file --value .frontend\ios\GoogleService-Info.plist
            Now that the secret its in the Google Cloud, delete the file from the project
                NOTE: If you add the file as a secret in EAS, you need to remove the googleServicesFile from app.json
            run eas build -p ios or eas build -p all (to build android and IOS)

2.Install packages: npm install @react-native-google-signin/google-signin

3.Configure the app

    3.1. IOS Configuration:
        Install CocoaPods dependencies inside ios folder:
            cd ios
            pod install
            cd ..

3.Integrate Google Sign-In on Frontend

5.Instal backend: Verify Google ID Token - npm install google-auth-library

# Features to do:

change ANY types
max attempts login try
reset password through sms code
validate if email exists (email verification)
if the user request a second verification code for reset password, the older one wont be valid anymore (just accept the newer one)
remove navigation header from authentication pages (login, signup...)
Splashscreen
