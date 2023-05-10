import React, { useState } from 'react';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import { DatePicker } from '@mui/x-date-pickers';

import { updateMember, deleteMember } from '../../../shared/api/api';

const MemberTableDialog = ({ member, open, onClose, onConfirm, onDelete }) => {
  const [firstName, setFirstName] = useState(member.firstName);
  const [surname, setSurname] = useState(member.surname);
  const [email, setEmail] = useState(member.email);
  const [membershipStartDate, setMembershipStartDate] = useState(
    member.membershipStartDate
  );
  const [membershipEndDate, setMembershipEndDate] = useState(
    member.membershipEndDate
  );

  const areDatesValid = (membershipStart, membershipEnd) => {
    return (
      membershipStart &&
      membershipEnd &&
      dayjs(membershipStart).isAfter(dayjs().subtract(1, 'day')) &&
      dayjs(membershipEnd).isSameOrAfter(dayjs(membershipStart).add(7, 'day'))
    );
  };

  const handleConfirm = async () => {
    const updatedMemberData = {
      ...member,
      firstName: firstName,
      surname: surname,
      email: email,
      membershipStartDate: dayjs(membershipStartDate).format('YYYY-MM-DD'),
      membershipEndDate: dayjs(membershipEndDate).format('YYYY-MM-DD'),
    };

    try {
      const updatedMember = await updateMember(member._id, updatedMemberData);

      onConfirm(updatedMember);
      onClose();
    } catch (error) {
      console.warn(error);
      setEmailError('Something went wrong while updating the member');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this member?'
    );

    if (confirmDelete) {
      try {
        await deleteMember(member._id);

        onDelete(member._id);
        onClose();
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Member Details</DialogTitle>
      <DialogContent>
        <TextField
          label='First Name'
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Surname'
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          margin='normal'
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          {' '}
          <DatePicker
            sx={{ width: '100%' }}
            label='Membership Start Date'
            value={dayjs(membershipStartDate)}
            onChange={(newValue) => {
              setMembershipStartDate(newValue);
            }}
            textField={(params) => (
              <TextField {...params} fullWidth margin='normal' />
            )}
            minDate={dayjs()}
          />
          <DatePicker
            sx={{ width: '100%' }}
            label='Membership End Date'
            value={dayjs(membershipEndDate)}
            onChange={(newValue) => {
              setMembershipEndDate(newValue);
            }}
            textField={(params) => (
              <TextField {...params} fullWidth margin='normal' />
            )}
            minDate={
              membershipStartDate
                ? dayjs(membershipStartDate).add(7, 'day')
                : dayjs()
            }
          />
        </div>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: '24px',
          paddingBottom: '16px',
        }}
      >
        <Button onClick={handleDelete} color='error' variant='outlined'>
          Delete
        </Button>

        <Box>
          <Button onClick={onClose} color='inherit'>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color='inherit'
            disabled={!areDatesValid(membershipStartDate, membershipEndDate)}
          >
            Confirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default MemberTableDialog;
