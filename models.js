'use strict';

const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    questionText: {type: String, required: true},
    type: String,
    userAdded: Boolean,
    public: Boolean,
    addedBy: {type: String, required: true},
    advice: String
},{collection: "questions"});

questionSchema.methods.serialize = function() {
    return {
        id: this._id,
        questionText: this.questionText,
        advice: this.advice
    };
}

const Question = mongoose.model('Question', questionSchema);

module.exports = {Question};