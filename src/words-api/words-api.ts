const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_REACT_APP_X_RAPID_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_REACT_APP_X_RAPID_API_HOST,
    }
};

export async function getAllByWord(word: string) {
    const response = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, options)

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    return response.json();
}
