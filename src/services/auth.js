import auth from '@react-native-firebase/auth'


export const  registerUser = async (email,password) =>{

    try {

        const usercredtianls = await auth().createUserWithEmailAndPassword(email,password);
        await usercredtianls.user.sendEmailVerification();
        return usercredtianls.user;
        
    } catch (error) {
        let errormeassage;
        switch (error.code) {
            case 'auth/email-already-in-use':
                errormeassage = " this email is already in use"
                break;

            case 'auth/invalid-email':
                    errormeassage = "this is not a valid email"
                    break;
                
            case 'auth/weak-password':
                        errormeassage = "password is very week "
                        break;
        
            default:
                    errormeassage='unknown error '
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
        console.log('Firebase Login Error:', error); // 👈 Add this line
    
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