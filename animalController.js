import Animal from "../models/Animal.js";
import TrackingLog from "../models/TrackingLog.js";

// @desc  Get all animals
// @route GET /api/animals
export const getAnimals = async (req, res) => {
  try {
    const { species, status } = req.query;
    const filter = {};
    if (species) filter.species = species;
    if (status) filter.status = status;

    const animals = await Animal.find(filter).sort({ createdAt: -1 });
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single animal by id, with recent tracking history
// @route GET /api/animals/:id
export const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });

    const history = await TrackingLog.find({ animal: animal._id })
      .sort({ recordedAt: -1 })
      .limit(100);

    res.json({ animal, history });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Register a new animal with a GPS/IoT tag
// @route POST /api/animals
export const createAnimal = async (req, res) => {
  try {
    const animal = await Animal.create(req.body);
    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc  Update animal details
// @route PUT /api/animals/:id
export const updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    res.json(animal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc  Remove an animal record
// @route DELETE /api/animals/:id
export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    res.json({ message: "Animal removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Dashboard summary stats
// @route GET /api/animals/stats/summary
export const getSummaryStats = async (req, res) => {
  try {
    const total = await Animal.countDocuments();
    const atRisk = await Animal.countDocuments({ status: "at-risk" });
    const injured = await Animal.countDocuments({ status: "injured" });
    const bySpecies = await Animal.aggregate([
      { $group: { _id: "$species", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({ total, atRisk, injured, bySpecies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
