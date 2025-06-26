// models/User.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // <--- ADD THIS LINE

class User extends Model {
    static async login(email, password) {
        const user = await User.findOne({ where: { email } });
        console.log("some shit")
        if (!user) {
            console.log("some shit")
            throw new Error('Incorrect email');
        }
        
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            console.log("encorrect password")
            throw new Error('Incorrect password');
        }

        // --- GENERATE TOKENS HERE ---
        // Ensure you have JWT_SECRET and JWT_REFRESH_SECRET in your .env file
        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, // Payload
            process.env.ACCESS_TOKEN_SECRET, // <--- Use your ACCESS_TOKEN_SECRET
            { expiresIn: '15m' } // Short expiry for access token
        );

        const refreshToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, // Payload
            process.env.REFRESH_TOKEN_SECRET, // <--- Use your REFRESH_TOKEN_SECRET
            { expiresIn: '7d' } // Longer expiry for refresh token
        );

        // Update user's refreshToken in the database (if you have the column)
        // Make sure you uncomment the refreshToken field in the User.init method below
        // and ensure your database table has a 'refresh_token' column
        user.refreshToken = refreshToken;
        await user.save(); // Save the updated user with the new refresh token

        return [refreshToken, accessToken]; // <--- RETURN AN ARRAY
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) { // Example: Hash password before saving
            const salt = bcrypt.genSaltSync(10);
            this.setDataValue('password', bcrypt.hashSync(value, salt));
        }
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
    // Uncomment this if you want to store refresh tokens in the database
    // refreshToken: {
    //     type: DataTypes.STRING,
    //     allowNull: true // Can be null if user logs out or session expires
    // }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    // If your database columns for createdAt/updatedAt are `created_at`/`updated_at`,
    // you might need `underscored: true` here too.
    // underscored: true
});

module.exports = User;