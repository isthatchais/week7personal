const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  const result = await mongodb.getDb().db('patients').collection('users').find();
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving users.');
  }
};

const getOneUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('patients').collection('users').find({ _id: userId });
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving patient.');
  }
};

const addUser = async (req, res) => {
  const user = {
    googleId: req.body.googleId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    displayName: req.body.displayName,
    image: req.body.image,
    createdAt: req.body.createdAt,
    assignedPatients: req.body.assignedPatients
  };
  const response = await mongodb.getDb().db('patients').collection('users').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating user.');
  }
};

const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id.');
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    googleId: req.body.googleId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    displayName: req.body.displayName,
    image: req.body.image,
    createdAt: req.body.createdAt,
    assignedPatients: req.body.assignedPatients
  };
  const response = await mongodb
    .getDb()
    .db('patients')
    .collection('users')
    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating user.');
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('patients')
    .collection('user')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting user.');
  }
};

module.exports = { getAllUsers, getOneUser, addUser, updateUser, deleteUser };