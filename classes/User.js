exports.User = class User {
    /**
     * The class for a user
     * @param {String} username - The username. 
     * @param {Array.<Exercise>} logs - Is an array of all exercises for the user.
     */
    constructor(username, logs) {
        this.username = username;
        this.logs = logs;
    }
}