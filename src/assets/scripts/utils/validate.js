/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} name
 * @returns {Boolean}
 */
export function validUsername() {
    return true
}

/**
 * @param {string} mobile
 * @returns {Boolean}
 */
export function validMobile(mobile) {
    return /^1[3|4|5|7|8|9][0-9]{9}$/.test(mobile)
}

/**
 * @param {string} mobile
 * @returns {Boolean}
 */
export function vaildPassword(val) { 
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(val)
}
