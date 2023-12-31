# Aces-india-backend
# Step 1: Signin/Signup system using JWT with Redis and DynamoDB or MongoDB

### `Backend Setup:`

Set up a Node.js server using Express.js.
Use Passport.js for authentication.
Use jsonwebtoken for JWT token creation and validation.
Use Redis to store JWT metadata.
Use DynamoDB or MongoDB to store user credentials.
Routes:

/signup: To register a new user.
/signin: To login a registered user.
/auth/google: For Google OAuth.
/auth/github: For GitHub OAuth.
Step 2: User Type Selection

Frontend:

After successful signup/signin, display options: Developer, Organization, Company.
Backend:

Store the selected option in DynamoDB or MongoDB.
Step 3: Hosting Option Selection

Frontend:

Display options: Self Hosting, XeroCode Hosting.
If Self Hosting is selected, show: AWS, Github.
Backend:

Store the selected hosting option in DynamoDB or MongoDB.
Step 4: GitHub App Integration

Frontend:

If GitHub is selected, redirect the user to install the GitHub App.
Backend:

Integrate with GitHub Apps API.
Once the app is installed, fetch public & private repositories of the user.
Display Repositories:

After fetching, display a list of repositories to the user on the frontend.
