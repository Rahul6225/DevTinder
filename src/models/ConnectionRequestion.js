const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUSerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,

      enum: {
        values: ["ignore", "accepted", "interested", "rejected"],
        message: `${VALUE} is incorrect status type`,
      },
    }, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
