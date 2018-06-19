const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const Resource = require("./Resource");

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  likes: { type: Number, default: 0 },
  build:{ type: String, required: true },
  version:{ type: String, required: true },
  chat:{ type: String, required: true },
  features:[{ type: String, required: true }],
  keywords:[{ type: String, required: true }],
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: "resource"
    }
  ],
  browserSupport:[{ type: String, required: true }],
  contributors: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ]
  // in V1 can make the contributors to be an array of string
});

// add comments later on to the schema

ProjectSchema.methods.like = function likeProject(id) {
  const Project = mongoose.model("project", ProjectSchema);
  return Project.findById(id).then(project => {
    ++project.likes;
    return project.save();
  });
};

ProjectSchema.methods.findContributors = function(id) {
  return this.findById(id)
    .populate(contributors)
    .then(project => {
      return project.contributors;
    });
};

ProjectSchema.methods.findResources = function(id) {
  return this.findById(id)
    .populate(resources)
    .then(project => {
      return project.resources;
    });
};

module.exports = mongoose.model("project", ProjectSchema);
