export const getTextContent4Multilanguage = (
    item:
        | string
        | {
              [key: string]: string
          },
    language: string
): string => {
    if (typeof item === 'object') {
        if (!item[language]) {
            item[language] = item['en']
        }

        return item[language]
    } else {
        return item
    }
}

export const getLongTextContent4Multilanguage = (
    item:
        | string
        | {
              [key: string]: string
          },
    language: string,
    maxLength: number = 5000
): string => {
    const regex = /(<([^>]+)>)/gi
    if (typeof item === 'object') {
        if (!item[language]) {
            item[language] = item['en']
        }

        return item[language].length > maxLength
            ? item[language].replace(regex, '').slice(0, maxLength).concat('...')
            : item[language]?.replace(regex, '') ?? ''
    } else {
        return item.length > maxLength
            ? item.replace(regex, '').slice(0, maxLength).concat('...')
            : item.replace(regex, '')
    }
}
