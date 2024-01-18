/**
 * summarised the provided content by the specified length by adding ... to it.
 */
export const summary = (content: string, requiredLength: number) =>
    content.length > requiredLength ? content.substring(0, requiredLength) + '...' : content;