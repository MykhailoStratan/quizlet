export interface iWordInfo {
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

interface WordDefinitionInfo {
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
