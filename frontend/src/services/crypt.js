export class Crypt {

    static cryptString(str) {
        if (str) {
            return btoa(str);
        } else {
            return null;
        }
    }

    static decryptString(str) {
        if(str){
            return atob(str);
        } else {
            return null;
        }
    }
}