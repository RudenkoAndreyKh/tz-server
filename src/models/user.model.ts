const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema(
    {
        login: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    }
);

export default mongoose.model("User", UserSchema);