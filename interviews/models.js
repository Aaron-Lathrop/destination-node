'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const interviewSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created: {type: Date, default: Date.now},
    responses: {type: Array, sparse: true}
});

interviewSchema.pre('create', function(next){
    this.populate('User');
    next();
});

interviewSchema.methods.serialize = function() {
    return {
        id: this._id,
        created: `${this.created.getMonth()+1}/${this.created.getDate()}/${this.created.getFullYear()}`,
        responses: this.responses
    };
};

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = {Interview};