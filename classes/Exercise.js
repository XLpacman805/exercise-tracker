exports.Exercise = class Exercise {
    /**
     * Definition of an exercise. 
     * @param {String} description - Description of the workout.
     * @param {Number} duration - Length of workout in minutes.
     * @param {String} date - Date in YYYY-MM-DD format.
     */
    constructor(description, duration, date) {
        if (typeof(description) == "string" && !isNaN(duration) && typeof(date) == "string") {
            this.description = description;
            this.duration = duration;
            this.date = date;
        } else {
            throw new TypeError("Parameters failed type check. Ensure parameters are in valid format.");
        }
    }
}