import express from 'express';
import {
  createMember,
  deleteMember,
  getMemberById,
  getMembers,
  updateMember,
} from '../controllers/member.controller.js';

const router = express.Router();

router.get('/', getMembers);

router.get('/:id', getMemberById);

router.post('/', createMember);

router.put('/:id', updateMember);

router.delete('/:id', deleteMember);

export default router;
