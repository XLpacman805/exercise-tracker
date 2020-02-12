exports.Exercise = class Exercise {
    /**
     * Definition of an exercise. 
     * @param {String} description - Description of the workout.
     * @param {Number} duration - Length of workout in minutes.
     * @param {Date} date - A JS Date. Should be UTC.
     */
    constructor(description, duration, date) {
        if (typeof(description) == "string" && !isNaN(duration) && date instanceof Date) {
            this.description = description;
            this.duration = duration;
            this.date = date.toISOString();
        } else {
            throw new TypeError("Parameters failed type check. Ensure parameters are in valid format.");
        }
    }
}