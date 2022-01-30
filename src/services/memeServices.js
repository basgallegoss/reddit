import axios from "axios";
import { useQuery } from "react-query";

export const getMemes = async () => {
    
    const { data } = await axios.get(
        "https://www.reddit.com/r/chile/.json?link_flair_text=Shitposting&post_hint='image'"
    );
    return data?.data?.children;
};

export function useMemes() {
    return useQuery(["memes"], getMemes, {
        retry: 1,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });
}
