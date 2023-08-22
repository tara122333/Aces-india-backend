// Library
import githubOAuth from 'passport-github2';
import { UserModel } from '../database/AllModels';


const GithubStrategy = githubOAuth.Strategy;

// passport.use(new GitHubStrategy({
//     clientID: GITHUB_CLIENT_ID,
//     clientSecret: GITHUB_CLIENT_SECRET,
//     callbackURL: "http://localhost:4000/auth/github/callback"
// },
//     function (accessToken, refreshToken, profile, done) {
//         User.findOrCreate({ githubId: profile.id }, function (err, user) {
//             return done(err, user);
//         });
//     }
// ));

export default (passport) => {
    passport.use(
        new GithubStrategy({
            // clientID:process.env.GOOGLE_CLIENT_ID,
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `/auth/github/callback`
        },
            async (accessToken, refreshToken, profile, done) => {
                //  create new user
                // console.log(profile);
                const newUser = {
                    fullname: profile.displayName,
                    email: profile.username,
                    profilePic: profile.photos[0].value,
                    verified: true,
                    // phoneNumber : profile.ph
                };
                // console.log(profile.displayName);
                // console.log(profile.emails[0].value);
                // console.log(profile.photos[0].value);
                try {
                    const user = await UserModel.findOne({ email: newUser.email });
                    // console.log(user);
                    if (user) {
                        const token = user.generateAuthToken();
                        done(null, { user, token });
                    } else {

                        const user = await UserModel.create(newUser);
                        const token = user.generateAuthToken();
                        done(null, { user, token });
                    }
                } catch (error) {
                    done(error, null); // first argument is return to google and second argument return to the callback
                }
            })
    );
    passport.serializeUser((userData, done) => done(null, { ...userData }));
    passport.deserializeUser((id, done) => done(null, id));

};
