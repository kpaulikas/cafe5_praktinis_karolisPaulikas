import * as React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useTheme } from '@mui/material/styles';
import { createNewMember } from '../../../shared/api/api';

dayjs.extend(duration);
dayjs.extend(advancedFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const initialFormData = {
  name: '',
  surname: '',
  email: '',
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const areDatesValid = (membershipStart, membershipEnd) => {
  return (
    membershipStart &&
    membershipEnd &&
    dayjs(membershipStart).isAfter(dayjs().subtract(1, 'day')) &&
    dayjs(membershipEnd).isSameOrAfter(dayjs(membershipStart).add(7, 'day'))
  );
};

export default function NewMemberDialog({ open, onClose, refreshMembers }) {
  const [formData, setFormData] = React.useState(initialFormData);
  const [membershipStart, setMembershipStart] = React.useState(null);
  const [membershipEnd, setMembershipEnd] = React.useState(null);
  const [emailError, setEmailError] = React.useState('');
  const [dateError, setDateError] = React.useState(false);
  const theme = useTheme();

  const handleChange = (event) => {
    const { name, value } = event.target;
    let filteredValue = value;

    if (name === 'name' || name === 'surname') {
      filteredValue = value.replace(/[^A-Za-z\s\u00C0-\u024F]/gi, '');
    } else if (name === 'email') {
      filteredValue = value.replace(/[^a-zA-Z@.0-9]/gi, '');
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: filteredValue,
    }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setMembershipStart(null);
    setMembershipEnd(null);
    setEmailError('');
  };

  const handleSubmit = async () => {
    try {
      const newMember = {
        firstName: formData.name,
        surname: formData.surname,
        email: formData.email.toLowerCase(),
        membershipStartDate: dayjs(membershipStart).format('YYYY-MM-DD'),
        membershipEndDate: dayjs(membershipEnd).format('YYYY-MM-DD'),
      };

      const response = await createNewMember(newMember);
      if (response.error) {
        setEmailError(response.error);
      } else {
        onClose(formData);
        handleReset();
        refreshMembers();
      }
    } catch (error) {
      setEmailError(error.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleReset();
        onClose();
      }}
    >
      <DialogTitle>New Member Form</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the new member details.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Name'
          type='text'
          fullWidth
          required
          name='name'
          value={formData.name}
          onChange={handleChange}
          inputProps={{
            maxLength: 50,
          }}
        />
        <TextField
          margin='dense'
          id='surname'
          label='Surname'
          type='text'
          fullWidth
          required
          name='surname'
          value={formData.surname}
          onChange={handleChange}
          inputProps={{
            maxLength: 50,
          }}
        />
        <TextField
          error={!!emailError}
          helperText={emailError}
          margin='dense'
          id='email'
          label='Email Address'
          type='email'
          fullWidth
          required
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          <DatePicker
            label='Membership Start'
            value={membershipStart}
            onChange={(newValue) => {
              setMembershipStart(newValue);
              setDateError(!areDatesValid(newValue, membershipEnd));
            }}
            textField={(params) => <TextField {...params} />}
            sx={{ width: '100%' }}
            minDate={dayjs()}
          />
          <DatePicker
            label='Membership End'
            value={membershipEnd}
            onChange={(newValue) => {
              setMembershipEnd(newValue);
              setDateError(!areDatesValid(membershipStart, newValue));
            }}
            textField={(params) => <TextField {...params} />}
            sx={{ width: '100%' }}
            minDate={
              membershipStart ? dayjs(membershipStart).add(7, 'day') : dayjs()
            }
          />
        </div>
      </DialogContent>
      <DialogActions sx={{ px: '24px', paddingBottom: '16px' }}>
        <Button
          color='inherit'
          onClick={() => {
            handleReset();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          color='success'
          onClick={handleSubmit}
          disabled={
            !formData.name ||
            !formData.surname ||
            !formData.email ||
            !membershipStart ||
            !membershipEnd ||
            !isValidEmail(formData.email) ||
            dateError
          }
        >
          Sign up
        </Button>
      </DialogActions>
    </Dialog>
  );
}
