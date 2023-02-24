export type iWordInfo = {
    word: string,
    results: WordDefinitionInfo[],
    syllables: {
        count: number,
        list: string[]
    },
    pronunciation: {
        all: string
    },
    frequency: number
}

type WordDefinitionInfo = {
    definition: string,
    partOfSpeech: string,
    typeOf: string[],
    hasTypes: string[],
    hasInstances: string[],
    hasParts: string[],
    hasMembers: string[],
    examples: string[],
    synonyms: string[],
    derivation: string[],
}
