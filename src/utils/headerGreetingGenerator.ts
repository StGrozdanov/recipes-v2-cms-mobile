const TIME_GREETINGS = {
    "Добро утро": [3, 4, 5, 6, 7, 8, 9, 10, 11],
    "Добър ден": [12, 13, 14, 15, 16, 17, 18],
    "Добър вечер": [19, 20, 21, 22, 23, 0, 1, 2]
}

const PAGE_MESSAGES: Record<string, string> = {
    'Dashboard': 'Статистически данни за сайта',
    'Users': 'Потребители на сайта',
    'Recipes': 'Колекция от рецепти',
    'Comments': 'Колекция от коментари',
    'Settings': 'Потребителски настройки',
}

/**
 * used to greet the user and display the current page that he is in
 */
export function greetingGenerator(currentPageName: string, currentHour: number) {
    let greeting;

    Object.entries(TIME_GREETINGS).forEach(timePart => {
        const timePartKey = timePart[0];
        const timePartValues = timePart[1];

        if (timePartValues.some(hour => hour === currentHour)) {
            greeting = timePartKey;
        }
    });

    const message = PAGE_MESSAGES[currentPageName];

    return {
        greeting,
        message
    }
}