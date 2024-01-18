/**
 * checks if the provided avatar is a valid image
 * @param avatarURL 
 */
export const userAvatarIsPresent = (avatarURL: string) =>
    avatarURL !== undefined
    && avatarURL.trim() !== ''
    && avatarURL !== null
    && avatarURL !== '/avatar.png';