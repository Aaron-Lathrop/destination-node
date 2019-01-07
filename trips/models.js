'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const tripSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created: {type: Date, default: Date.now},
    startDate: {type: String, default: ''},
    endDate: {type: String}, default: '',
    dateList: {type: Array, default: []},
    destination: {type: String, default: ''},
    icon: {type: String, default: ''},
    planCards: {type: Array, default: []}
});

tripSchema.pre('create', function(next){
    this.populate('User');
    next();
});

tripSchema.methods.serialize = function() {
    return {
        tripId: this._id,
        created: `${this.created.getMonth()+1}/${this.created.getDate()}/${this.created.getFullYear()}`,
        startDate: this.startDate,
        endDate: this.endDate,
        dateList: this.dateList,
        destination: this.destination,
        icon: this.icon,
        planCards: this.planCards
    };
};

const Trip = mongoose.model("Trip", tripSchema);

module.exports = {Trip};