const ClientModel = require("../models/Client");

exports.getAllClients = async () => {
  return await ClientModel.find().sort({ createdAt: -1 });
};

exports.createClient = async (client) => {
  return await ClientModel.create(client);
};

exports.getClientById = async (id) => {
  return await ClientModel.findById(id);
};

exports.updateClient = async (id, client) => {
  return await ClientModel.findByIdAndUpdate(id, client);
};

exports.deleteClient = async (id) => {
  return await ClientModel.findByIdAndDelete(id);
};

exports.getAllClientsBySearch = async (query) => {
  return await ClientModel.find({
    names: { $regex: query, $options: "i" },
  });
};
