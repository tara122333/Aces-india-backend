// Library
import githubOAuth from 'passport-github2';
import { UserModel } from '../database/AllModels';


const GithubStrategy = githubOAuth.Strategy;

export default (passport) => {
    passport.use(
        new GithubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID_REPO,
            clientSecret: process.env.GITHUB_CLIENT_SECRET_REPO,
            callbackURL: `https://xerocodeeassignment.onrender.com/auth/github/repo`
        },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    fullname: profile.displayName ? profile.displayName : profile.username,
                    email: profile.username,
                    profilePic: profile.photos[0].value,
                    verified: true,
                };
                try {
                    const user = await UserModel.findOne({ email: newUser.email });
                    if (user) {
                        const token = user.generateAuthToken();
                        done(null, { user, token, accessToken, refreshToken });
                    } else {

                        // const user = await UserModel.create(newUser);
                        const token = user.generateAuthToken();
                        done(null, { user, token, accessToken, refreshToken });
                    }
                } catch (error) {
                    done(error, null);
                }
            })
    );
    passport.serializeUser((userData, done) => done(null, { ...userData }));
    passport.deserializeUser((id, done) => done(null, id));

};
