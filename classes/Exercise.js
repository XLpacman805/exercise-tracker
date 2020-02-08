exports.Exercise = class Exercise {
    /**
     * Definition of an exercise. 
     * @param {String} description - Description of the workout.
     * @param {Integer} duration - Length of workout in minutes.
     * @param {String} date - Date in YYYY-MM-DD format.
     */
    constructor(description, duration, date) {
        this.description = description;
        this.duration = duration;
        this.date = date;
    }
}