// Library
import githubOAuth from 'passport-github2';
import { UserModel } from '../database/AllModels';


const GithubStrategy = githubOAuth.Strategy;

export default (passport) => {
    passport.use(
        new GithubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `https://xerocodeeassignment.onrender.com/auth/github/callback`
        },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    fullname: profile.displayName ? profile.displayName : profile.username,
                    email: profile.username,
                    profilePic: profile.photos[0].value,
                    verified: true,
                    accessToken :accessToken
                };
                try {
                    const user = await UserModel.findOne({ email: newUser.email });
                    if (user) {
                        const user = await UserModel.findOneAndUpdate(
                            {
                                email:newUser.email
                            },
                            {
                                $set : newUser
                            },
                            {
                                new : true
                            });
                        const token = user.generateAuthToken();
                        done(null, { user, accessToken, token,refreshToken });
                    } else {

                        const user = await UserModel.create(newUser);
                        const token = user.generateAuthToken();
                        done(null, { user,token,accessToken, refreshToken });
                    }
                } catch (error) {
                    done(error, null); 
                }
            })
    );
    passport.serializeUser((userData, done) => done(null, { ...userData }));
    passport.deserializeUser((id, done) => done(null, id));

};
