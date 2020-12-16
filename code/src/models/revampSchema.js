const mongoose = require('mongoose');

const RevampSchema = new mongoose.Schema(
    {
      guild_id: String, // ID of the guild
      revamped_at: {type: Date, default: Date.now()}, // Revamed at; defaults to now
      revamped_by: String, // ID of the command invoker
      emoji: String, // Emoji used to revamp the server
      divider: String, // Divider used to revamp the server
      total_text_channels: Number, // total # of text channels revamped
      total_voice_channels: Number, // total # of voice channels revamped
      total_categories: Number,  // total # of categories revamped
      total_roles: Number  // total # of roles revamped
    }
  );

module.exports = mongoose.model("RevampSchema", RevampSchema);