export function classNames(requiredClasses, logicClasses = {}) {
    if(!requiredClasses.length) {
        return '';
    }

    let result = requiredClasses.join(' ');

    for(const [className, isActive] of Object.entries(logicClasses)) {
        if(isActive && typeof className == 'string') {
            result += ' ' + className;
        }
    }

    return result;
}
