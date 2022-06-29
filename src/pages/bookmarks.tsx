import {fetchPosts, initFirebaseApp} from "../utils";
import {getAuth} from "firebase/auth";
import Login from "../Login/Login";

initFirebaseApp();

const auth = getAuth();

const BookmarksPage = () => {
    const posts = fetchPosts(auth);
    console.log({posts, auth, currentUser: auth.currentUser});
    return (
        <Login>
            <div>
                bookmarks page
            </div>
        </Login>
    )
}

export default BookmarksPage;