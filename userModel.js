// Require mongoose
// var mongoose = require("mongoose");

// // Create the Schema class
// var Schema = mongoose.Schema;

// // new Schema: UserSchema
// var UserSchema = new Schema({
//   // firstName: a trimmed, required string
//   firstName: {
//     type: String,
//     trim: true,
//     required: "First Name is Required"
//   },
//   // lastName: a trimmed, required string
//   lastName: {
//     type: String,
//     trim: true,
//     required: "Last Name is Required"
//   },
//   // username: a trimmed, required string
//   username: {
//     type: String,
//     trim: true,
//     required: "Username is Required"
//   },
//   // password: a trimmed, required string that must be more than 6 chars
//   password: {
//     type: String,
//     trim: true,
//     required: "Password is Required",
//     validate: [
//       function(input) {
//         return input.length >= 6;
//       },
//       "Password should be longer."
//     ]
//   },
//   // email: a string that must match an email format and must be unique in the collection
//   email: {
//     type: String,
//     unique: true,
//     match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
//   },
//   // userCreated: the current date
//   userCreated: {
//     type: Date,
//     default: Date.now
//   },
//   // lastUpdated: a date type entry
//   lastUpdated: { type: Date },
//   // fullName: a string type entry
//   fullName: String
// });


// /* vvv MAKE YOUR CUSTOM METHODS HERE vvv */
// /* ===================================== */

// // 1. getFullName: concatenate the first and last name and return it
//   UserSchema.methods.getFullName = function() {
//     // enter your method code here
//     var first = this.firstName;
//     var last = this.lastName;
//     var name = first + " " + last;
//     this.fullName = name;

//     return this.fullName
//   };

// // 2. lastUpdatedDate: save the current date to a variable and return it
//   UserSchema.methods.lastUpdatedDate = function() {
//     // enter your method code here
//     this.lastUpdated = date.now();

//     return this.lastUpdated;
   
//   };


// // Use the above schema to make the User model
// var User = mongoose.model("User", UserSchema);

// // Export the model so the server can use it
// module.exports = User;