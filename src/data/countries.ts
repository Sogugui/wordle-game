export interface Country {
    id?: number
    name: {
        [index: string]: string
        es: string
        en: string
        fr: string
        de: string
    }
    flag: string
    language: string
}



export const Countries: Country[] = [
    {
        id: 1,
        name: {
            en: 'English',
            es: 'Inglés',
            fr: 'Anglais',
            de: 'Englisch',
        },
        flag: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-usa2x.png',
        language: 'en',
    },
    {
        id: 2,
        name: {
            en: 'French',
            es: 'Francés',
            fr: 'Français',
            de: 'Französisch',
        },
        flag: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-france2x.png',
        language: 'fr',
    },
    {
        id: 3,
        name: {
            en: 'Spanish',
            es: 'Español',
            fr: 'Espagnol',
            de: 'Spanisch',
        },
        flag: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-spain2x.png',
        language: 'es',
    },
    {
        id: 4,
        name: {
            en: 'German',
            es: 'Alemán',
            fr: 'Allemand',
            de: 'Deutsch',
        },
        flag: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-germany2x.png',
        language: 'de',
    },
]
