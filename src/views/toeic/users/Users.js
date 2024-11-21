import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CBadge,
  CFormInput,
  CInputGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilFilter, cilTrash, cilPencil, cilUser } from '@coreui/icons'

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'johndoe',
      email: 'john@example.com',
      status: 'Active',
      membershipType: 'Premium',
      lastLogin: '2024-03-20',
      registeredDate: '2023-12-15',
      examsTaken: 15,
    },
    {
      id: 2,
      username: 'janesmith',
      email: 'jane@example.com',
      status: 'Active',
      membershipType: 'Regular',
      lastLogin: '2024-03-19',
      registeredDate: '2024-01-10',
      examsTaken: 8,
    },
    {
      id: 3,
      username: 'mikebrown',
      email: 'mike@example.com',
      status: 'Blocked',
      membershipType: 'Premium',
      lastLogin: '2024-03-15',
      registeredDate: '2023-11-20',
      examsTaken: 25,
    },
    // Thêm nhiều user mẫu khác...
  ])

  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    membershipType: '',
    dateRange: '',
  })

  // Modal states
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [viewModal, setViewModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  // Search and Filter Logic
  useEffect(() => {
    let result = [...users]

    // Search
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (filters.status) {
      result = result.filter((user) => user.status === filters.status)
    }

    // Membership filter
    if (filters.membershipType) {
      result = result.filter((user) => user.membershipType === filters.membershipType)
    }

    // Date range filter
    if (filters.dateRange) {
      const today = new Date()
      const days = {
        last7days: 7,
        last30days: 30,
        last90days: 90,
      }
      const daysAgo = new Date(today.setDate(today.getDate() - days[filters.dateRange]))

      result = result.filter((user) => new Date(user.registeredDate) >= daysAgo)
    }

    setFilteredUsers(result)
  }, [users, searchTerm, filters])

  // Action Handlers
  const handleDelete = () => {
    setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id))
    setDeleteModal(false)
  }

  const handleStatusChange = (user) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u,
      ),
    )
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Users Management</strong>
                  <CBadge color="primary" className="ms-2">
                    {users.length} Users
                  </CBadge>
                </div>
                <div className="d-flex gap-2">
                  <CInputGroup style={{ width: '300px' }}>
                    <CFormInput
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <CButton color="primary" variant="outline">
                      <CIcon icon={cilSearch} />
                    </CButton>
                  </CInputGroup>
                  <CDropdown autoClose="outside">
                    <CDropdownToggle color="secondary">
                      <CIcon icon={cilFilter} className="me-1" /> Filters
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem header>Status</CDropdownItem>
                      <CDropdownItem>
                        <CFormSelect
                          size="sm"
                          value={filters.status}
                          onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                          <option value="">All Status</option>
                          <option value="Active">Active</option>
                          <option value="Blocked">Blocked</option>
                        </CFormSelect>
                      </CDropdownItem>
                      <CDropdownItem header>Membership</CDropdownItem>
                      <CDropdownItem>
                        <CFormSelect
                          size="sm"
                          value={filters.membershipType}
                          onChange={(e) => handleFilterChange('membershipType', e.target.value)}
                        >
                          <option value="">All Types</option>
                          <option value="Regular">Regular</option>
                          <option value="Premium">Premium</option>
                        </CFormSelect>
                      </CDropdownItem>
                      <CDropdownItem header>Registration Date</CDropdownItem>
                      <CDropdownItem>
                        <CFormSelect
                          size="sm"
                          value={filters.dateRange}
                          onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                        >
                          <option value="">All Time</option>
                          <option value="last7days">Last 7 Days</option>
                          <option value="last30days">Last 30 Days</option>
                          <option value="last90days">Last 90 Days</option>
                        </CFormSelect>
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Membership</CTableHeaderCell>
                    <CTableHeaderCell>Registration Date</CTableHeaderCell>
                    <CTableHeaderCell>Last Login</CTableHeaderCell>
                    <CTableHeaderCell>Exams Taken</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredUsers.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.username}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={user.status === 'Active' ? 'success' : 'danger'}>
                          {user.status}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={user.membershipType === 'Premium' ? 'warning' : 'info'}>
                          {user.membershipType}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{user.registeredDate}</CTableDataCell>
                      <CTableDataCell>{user.lastLogin}</CTableDataCell>
                      <CTableDataCell>{user.examsTaken}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            setSelectedUser(user)
                            setViewModal(true)
                          }}
                        >
                          <CIcon icon={cilUser} />
                        </CButton>
                        {/* Edit User */}
                        {/* <CButton
                          color="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            setSelectedUser(user)
                            setEditModal(true)
                          }}
                        >
                          <CIcon icon={cilPencil} />
                        </CButton> */}
                        <CButton
                          color={user.status === 'Active' ? 'danger' : 'success'}
                          size="sm"
                          className="me-2"
                          onClick={() => handleStatusChange(user)}
                        >
                          {user.status === 'Active' ? 'Block' : 'Unblock'}
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(user)
                            setDeleteModal(true)
                          }}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Delete Confirmation Modal */}
      <CModal visible={deleteModal} onClose={() => setDeleteModal(false)}>
        <CModalHeader>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete user &quot;{selectedUser?.username}?&quot; This action cannot be undone.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      {/* View User Modal */}
      <CModal visible={viewModal} onClose={() => setViewModal(false)} size="lg">
        <CModalHeader>
          <CModalTitle>User Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedUser && (
            <div>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
              <p><strong>Membership:</strong> {selectedUser.membershipType}</p>
              <p><strong>Registration Date:</strong> {selectedUser.registeredDate}</p>
              <p><strong>Last Login:</strong> {selectedUser.lastLogin}</p>
              <p><strong>Exams Taken:</strong> {selectedUser.examsTaken}</p>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setViewModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Edit User Modal */}
      {/* <CModal visible={editModal} onClose={() => setEditModal(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Edit User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedUser && (
            <div>
              <CFormInput
                label="Username"
                value={selectedUser.username}
                className="mb-3"
              />
              <CFormInput
                label="Email"
                value={selectedUser.email}
                className="mb-3"
              />
              <CFormSelect
                label="Membership Type"
                value={selectedUser.membershipType}
                className="mb-3"
              >
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
              </CFormSelect>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditModal(false)}>
            Cancel
          </CButton>
          <CButton color="primary">Save Changes</CButton>
        </CModalFooter>
      </CModal> */}
    </>
  )
}

export default Users
