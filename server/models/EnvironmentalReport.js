
import mongoose from "mongoose";

const environmentalReportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Deforestation",
        "Water Pollution",
        "Waste Dumping",
        "Wildlife & Habitat",
        "Air Pollution",
        "Other Environmental Issue",
      ],
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 2000,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Verified", "In Progress", "Resolved"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const EnvironmentalReport = mongoose.model(
  "EnvironmentalReport",
  environmentalReportSchema
);

export default EnvironmentalReport;
