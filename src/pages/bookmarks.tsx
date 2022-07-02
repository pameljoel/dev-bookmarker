import {fetchPosts, initFirebaseApp} from "../utils";
import {getAuth} from "firebase/auth";
import Login from "../Login/Login";
import React, {useEffect, useState} from "react";
import {Chunks, SavedUrlWithParts} from "../type";
import {generateUrlsToSave} from "../home/Home";
import PreviewUrls from "../url/PreviewUrls/PreviewUrls";
import {makeArrayOfValues} from "../url/UrlComponent";

type Post = {
    'original-url': string;
    chunks: Chunks;
}

type Posts = Post[];

initFirebaseApp();

const BookmarksPage = () => {
    const auth = getAuth();
    const [posts, setPosts] = useState<Posts>([]);
    // const [savedUrls, setSavedUrls] = useState<string[]>([]);

    const hasPosts = posts && posts.length > 0;

    useEffect(() => {
        fetchPosts(auth).then((response: any) => {
            setPosts(response);
        });
    }, []);

    return (
        <Login>
            <div>
                bookmarks page

                {hasPosts && posts.map((post, i) => {
                    return <PreviewUrls { ...{savedUrls: generateUrlsToSave(makeArrayOfValues(post.chunks)) } } key={`${post['original-url']}-${i}`}/>
                })}
            </div>
        </Login>
    )
}

export default BookmarksPage;