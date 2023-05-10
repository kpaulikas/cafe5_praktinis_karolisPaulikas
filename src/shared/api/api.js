import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
});

export async function fetchMembers() {
  try {
    const response = await apiClient.get('/api/members');
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createNewMember(newMember) {
  try {
    const response = await apiClient.post('/api/members', newMember);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data.message);
    } else if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized: authentication failed');
    } else if (error.response && error.response.status === 403) {
      throw new Error('Forbidden: insufficient permissions');
    } else if (error.response && error.response.status === 500) {
      throw new Error(
        'Internal server error: something went wrong while creating a new member'
      );
    } else {
      throw new Error(error.message);
    }
  }
}

export async function updateMember(memberId, updatedMemberData) {
  try {
    const response = await apiClient.put(
      `/api/members/${memberId}`,
      updatedMemberData
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data.message);
    } else if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized: authentication failed');
    } else if (error.response && error.response.status === 403) {
      throw new Error('Forbidden: insufficient permissions');
    } else if (error.response && error.response.status === 500) {
      throw new Error(
        'Internal server error: something went wrong while updating the member'
      );
    } else {
      throw new Error(error.message);
    }
  }
}

export async function deleteMember(memberId) {
  try {
    const response = await apiClient.delete(`/api/members/${memberId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data.message);
    } else if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized: authentication failed');
    } else if (error.response && error.response.status === 403) {
      throw new Error('Forbidden: insufficient permissions');
    } else if (error.response && error.response.status === 500) {
      throw new Error(
        'Internal server error: something went wrong while deleting the member'
      );
    } else {
      throw new Error(error.message);
    }
  }
}
