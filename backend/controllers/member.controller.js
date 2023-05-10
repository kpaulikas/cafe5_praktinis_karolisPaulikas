import Member from '../models/member.model.js';

const createMember = async (req, res, next) => {
  try {
    const newMember = await Member.create(req.body);
    res.status(201).json(newMember);
  } catch (error) {
    next(error);
  }
};

const getMembers = async (req, res, next) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};

const getMemberById = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) throw new Error('Member not found');
    res.status(200).json(member);
  } catch (error) {
    next(error);
  }
};

const updateMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const options = { new: true };

    const updatedMember = await Member.findByIdAndUpdate(id, update, options);

    if (!updatedMember) {
      throw new Error('Member not found');
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    next(error);
  }
};

const deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedMember = await Member.findByIdAndDelete(id);

    if (!deletedMember) {
      throw new Error('Member not found');
    }

    res.status(200).json(deletedMember);
  } catch (error) {
    next(error);
  }
};

export { createMember, getMembers, getMemberById, updateMember, deleteMember };
