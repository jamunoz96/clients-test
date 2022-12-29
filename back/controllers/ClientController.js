const clientService = require("../services/ClientService");

exports.getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    res.json({ data: clients });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const client = await clientService.createClient(req.body);
    res.json({ data: client });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    res.json({ data: client });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await clientService.updateClient(req.params.id, req.body);
    res.json({ data: client });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    req.body.map(async (id) => {
      await clientService.deleteClient(id);
    });
    res.json({ data: res.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllClientsBySearch = async (req, res) => {
  try {
    const clients = await clientService.getAllClientsBySearch(req.params.query);
    res.json({ data: clients });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
