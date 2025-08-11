import { useState, useEffect } from 'react';

interface GifData {
    images: {
        downsized_medium: {
            url: string;
        };
    };
}

interface UseFetchProps {
    keyword: string;
}

const API_KEY: string = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }: UseFetchProps): string => {
    const [gifUrl, setGifUrl] = useState<string>("");

    const fetchGif = async (): Promise<void> => {
        try {
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`
            );

            const { data }: { data: GifData[] } = await response.json();
            setGifUrl(data[0]?.images?.downsized_medium?.url || "");

        } catch (error) {
            console.error("Error fetching GIF:", error);
            setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
        }
    };

    useEffect(() => {
        if (keyword) fetchGif();
    }, [keyword]);

    return gifUrl;
};

export default useFetch;