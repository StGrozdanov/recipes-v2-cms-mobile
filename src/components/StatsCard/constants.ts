import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons/faFileCirclePlus";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { statsCardStyles } from "./StatsCardStyleSheet";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const cardIconsStyles: { [key: string]: { color: string, backgroundColor: string } } = {
    ПУБЛИКАЦИИ: statsCardStyles.publications,
    ПОТРЕБИТЕЛИ: statsCardStyles.users,
    КОМЕНТАРИ: statsCardStyles.comments,
    ПОСЕЩЕНИЯТАДНЕС: statsCardStyles.visitations,
};

export const CARD_ICONS: { [key: string]: IconDefinition } = {
    ПУБЛИКАЦИИ: faFileCirclePlus,
    ПОТРЕБИТЕЛИ: faUsers,
    КОМЕНТАРИ: faComments,
    ПОСЕЩЕНИЯТАДНЕС: faEye,
}