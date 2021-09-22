export const getTextContent4Multilanguage = (
    item:
        | string
        | {
              [key: string]: string
          },
    language: string
): string => {
    if (typeof item === 'object') {
        return item[language]
    } else {
        return item
    }
}
