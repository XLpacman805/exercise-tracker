exports.User = class User {
    /**
     * The class for a user
     * @param {String} username - The username. 
     * @param {Array.<Exercise>} logs - Is an array of all exercises for the user.
     */
    constructor(username, logs) {
        if (typeof(username) === "string" && Array.isArray(logs)) {
            this.username = username;
            this.logs = logs;
        } else {
            throw new TypeError("Error with parameter data types.")
        }
    }
}