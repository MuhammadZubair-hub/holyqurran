import auth ,{GoogleAuthProvider, getAuth, signInWithCredential}from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';



export const  registerUser = async (name,email,password) =>{

    try {

        const usercredtianls = await auth().createUserWithEmailAndPassword(email,password);

        await usercredtianls.user.updateProfile({
            displayName: name,
        });
        
        await usercredtianls.user.sendEmailVerification();
        return usercredtianls.user;
        
    } catch (error) {
        let errormeassage;
        switch (error.code) {
            case 'auth/email-already-in-use':
                errormeassage = " This email is already in use"
                break;

            case 'auth/invalid-email':
                    errormeassage = "This is not a valid email"
                    break;
                
            case 'auth/weak-password':
                        errormeassage = "password is very weak "
                        break;
        
            default:
                    errormeassage='Unknown error '
                break;
        }

        throw new Error(errormeassage)
        
    }

}

export const loginUser = async (email,password) =>{

    try {

        const usercredtianls = await auth().signInWithEmailAndPassword(email,password);
        const user = usercredtianls.user;
        return { user , emailVerfied : user.emailVerified};
        
    } catch (error) {
        console.log('Firebase Login Error:', error); 
    
        let errorMessage;
        switch (error.code) {
            case 'auth/invalid-credential':
                errorMessage = 'Your credential is not correct';
                break;
            case 'auth/user-not-found':
                errorMessage = 'Your account is not verified';
                break;
            default:
                errorMessage = 'An unknown error occurred';
                break;
        }
    
        throw new Error(errorMessage);
    }

}

export const resetpassword = async (email)=>{

    try {
        
        await auth().sendPasswordResetEmail(email);

    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'Your account is not verified';
                break;
            case 'auth/invalid-email':
                errorMessage = "this is not a valid email"
                    break;
        
            default:
                errorMessage = 'An unknown error occurred';
                break;
        }
        
    }
}



// export const signInWithGoogle = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const { idToken } = await GoogleSignin.signIn();
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//     return auth().signInWithCredential(googleCredential);
//   } catch (error) {
//     console.error("Google Sign-In Error: ", error);
//     throw error;
//   }
// };





export const signInWithGoogle = async function onGoogleButtonPress() {
  
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
   await GoogleSignin.signOut();

  const signInResult = await GoogleSignin.signIn();

//   Try the new style of google-sign in result, from v13+ of that module
 const idToken = signInResult.data?.idToken;
  if (!idToken) {
    // if you are using older versions of google-signin, try old style result
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = GoogleAuthProvider.credential(signInResult.data.idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}