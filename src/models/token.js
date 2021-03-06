const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expires: {
    type: Date,
    default: Date.now,
    index: { expires: 60 * 60 * 24 * 30 }, // 30 days
  },
});

// tokenSchema.createIndex({ 'createdAt': 1 }, { expireAfterSeconds: 10 });

module.exports = mongoose.model('tokens', tokenSchema);
