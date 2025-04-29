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
                        errormeassage = "password is ver weak "
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
        let errormeassage
        switch (error.code) {
            case 'auth/wrong-password':
                errormeassage= 'your password is not correct'
                
                break;
            case 'auth/user-not-found':
                    errormeassage = 'your account is not verfied'
                    
                    break;
        
            default:
                errormeassage = "an unknwon error"
                break;
        }

        throw new Error(errormeassage)
        
    }

}