
import express from "express";
import mongoose from "mongoose";
import EnvironmentalReport from "../models/EnvironmentalReport.js";
import { requireAdmin } from "../middlewares/adminAuth.js";

const router = express.Router();

const allowedCategories = [
  "Deforestation",
  "Water Pollution",
  "Waste Dumping",
  "Wildlife & Habitat",
  "Air Pollution",
  "Other Environmental Issue",
];

// POST /api/reports
// Validate and save a new environmental report.
router.post("/", async (req, res) => {
  try {
    const {
      title,
      category,
      district,
      location,
      description,
      email,
    } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      title.trim().length > 120
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid report title (maximum 120 characters).",
      });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Choose a valid environmental issue category.",
      });
    }

    if (typeof district !== "string" || !district.trim()) {
      return res.status(400).json({
        success: false,
        message: "District is required.",
      });
    }

    if (
      typeof location !== "string" ||
      !location.trim() ||
      location.trim().length > 200
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid location (maximum 200 characters).",
      });
    }

    if (
      typeof description !== "string" ||
      description.trim().length < 20 ||
      description.trim().length > 2000
    ) {
      return res.status(400).json({
        success: false,
        message: "Description must be between 20 and 2000 characters.",
      });
    }

    if (
      email !== undefined &&
      email !== "" &&
      (typeof email !== "string" ||
        email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid contact email.",
      });
    }

    const report = await EnvironmentalReport.create({
      title: title.trim(),
      category,
      district: district.trim(),
      location: location.trim(),
      description: description.trim(),
      contactEmail: email || "",
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Environmental report saved successfully.",
      report: {
        id: report._id,
        title: report.title,
        category: report.category,
        district: report.district,
        location: report.location,
        status: report.status,
        createdAt: report.createdAt,
      },
    });
  } catch (error) {
    console.error("Create report error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save the report.",
    });
  }
});

// GET /api/reports
// Retrieve recent reports.
router.get("/", async (req, res) => {
  try {
    const reports = await EnvironmentalReport.find()
      .select("-contactEmail")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Fetch reports error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve reports.",
    });
  }
});

// GET /api/reports/:id
// Retrieve one report by its MongoDB ID.
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report ID.",
      });
    }

    const report = await EnvironmentalReport.findById(req.params.id)
      .select("-contactEmail")
      .lean();

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    return res.json({ success: true, report });
  } catch (error) {
    console.error("Fetch report error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve the report.",
    });
  }
});

router.patch("/:id/status", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    const allowedStatuses = [
      "Pending",
      "Verified",
      "In Progress",
      "Resolved",
    ];

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report ID.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report status.",
      });
    }

    const report = await EnvironmentalReport.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true }
    ).select("-contactEmail");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    return res.json({
      success: true,
      message: "Report status updated successfully.",
      report,
    });
  } catch (error) {
    console.error("Report status update error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to update report status.",
    });
  }
});

export default router;
