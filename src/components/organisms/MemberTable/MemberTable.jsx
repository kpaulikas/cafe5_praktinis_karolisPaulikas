import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import MemberTableDialog from '../../molecules/MemberTableDialog/MemberTableDialog';

import { fetchMembers, deleteMember } from '../../../shared/api/api';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(new Date(date))
    .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
};

const MemberTable = ({ refreshTrigger, onMembersUpdated }) => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (member) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedMember(null);
    setIsDialogOpen(false);
  };

  const handleDialogConfirm = async (updatedMember) => {
    onMembersUpdated();
  };

  const handleDialogDelete = (deletedMemberId) => {
    setMembers(members.filter((member) => member._id !== deletedMemberId));
  };

  useEffect(() => {
    const getMembers = async () => {
      try {
        const members = await fetchMembers();
        setMembers(members);
      } catch (error) {
        setError(error);
      }
    };
    getMembers();
  }, [refreshTrigger]);

  return (
    <Container maxWidth='xl'>
      {error && (
        <Alert severity='error' onClose={() => setError(null)}>
          {error.message}
        </Alert>
      )}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: '100%',
            maxHeight: `${54 * 10 + 48}px`,
            overflowY: 'scroll',
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((member) => (
                  <TableRow
                    key={member._id}
                    onClick={() => handleRowClick(member)}
                    sx={{ cursor: 'pointer' }}
                    hover={true}
                  >
                    <TableCell>{member.firstName}</TableCell>
                    <TableCell>{member.surname}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      {formatDate(member.membershipStartDate)}
                    </TableCell>
                    <TableCell>
                      {formatDate(member.membershipEndDate)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component='div'
          count={members.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
      {selectedMember && (
        <MemberTableDialog
          member={selectedMember}
          open={isDialogOpen}
          onClose={handleDialogClose}
          onConfirm={handleDialogConfirm}
          onDelete={handleDialogDelete}
        />
      )}
    </Container>
  );
};

export default MemberTable;
