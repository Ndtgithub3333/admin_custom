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
import { useNavigate } from 'react-router-dom' // Import useNavigate

const Users = () => {
  const navigate = useNavigate() // Initialize useNavigate

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
    {
      id: 4,
      username: 'emilywhite',
      email: 'emily.white@example.com',
      status: 'Active',
      membershipType: 'Regular',
      lastLogin: '2024-03-18',
      registeredDate: '2023-09-12',
      examsTaken: 12,
    },
    {
      id: 5,
      username: 'robertjohnson',
      email: 'robert.johnson@example.com',
      status: 'Blocked',
      membershipType: 'Premium',
      lastLogin: '2024-03-14',
      registeredDate: '2023-08-25',
      examsTaken: 30,
    },
    {
      id: 6,
      username: 'sarawilson',
      email: 'sara.wilson@example.com',
      status: 'Active',
      membershipType: 'Premium',
      lastLogin: '2024-03-16',
      registeredDate: '2024-02-01',
      examsTaken: 18,
    },
    {
      id: 7,
      username: 'davidmartin',
      email: 'david.martin@example.com',
      status: 'Active',
      membershipType: 'Regular',
      lastLogin: '2024-03-12',
      registeredDate: '2023-11-30',
      examsTaken: 10,
    },
    {
      id: 8,
      username: 'chrislee',
      email: 'chris.lee@example.com',
      status: 'Blocked',
      membershipType: 'Regular',
      lastLogin: '2024-03-08',
      registeredDate: '2024-01-15',
      examsTaken: 5,
    },
    {
      id: 9,
      username: 'lisabrown',
      email: 'lisa.brown@example.com',
      status: 'Active',
      membershipType: 'Premium',
      lastLogin: '2024-03-10',
      registeredDate: '2023-10-20',
      examsTaken: 20,
    },
    {
      id: 10,
      username: 'markdavis',
      email: 'mark.davis@example.com',
      status: 'Blocked',
      membershipType: 'Premium',
      lastLogin: '2024-03-06',
      registeredDate: '2023-12-10',
      examsTaken: 25,
    },
    {
      id: 11,
      username: 'nancytaylor',
      email: 'nancy.taylor@example.com',
      status: 'Active',
      membershipType: 'Regular',
      lastLogin: '2024-03-11',
      registeredDate: '2023-09-18',
      examsTaken: 7,
    },
    {
      id: 12,
      username: 'paulanderson',
      email: 'paul.anderson@example.com',
      status: 'Active',
      membershipType: 'Premium',
      lastLogin: '2024-03-13',
      registeredDate: '2023-11-05',
      examsTaken: 15,
    },
    {
      id: 13,
      username: 'helenmoore',
      email: 'helen.moore@example.com',
      status: 'Blocked',
      membershipType: 'Regular',
      lastLogin: '2024-03-07',
      registeredDate: '2024-01-20',
      examsTaken: 10,
    },
    {
      id: 14,
      username: 'alicegreen',
      email: 'alice.green@example.com',
      status: 'Active',
      membershipType: 'Regular',
      lastLogin: '2024-03-21',
      registeredDate: '2024-01-05',
      examsTaken: 12,
    },
    {
      id: 15,
      username: 'bobwhite',
      email: 'bob.white@example.com',
      status: 'Blocked',
      membershipType: 'Premium',
      lastLogin: '2024-03-22',
      registeredDate: '2024-02-10',
      examsTaken: 5,
    },
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
  const [examHistory, setExamHistory] = useState([])

  // Sample data for exam history
  const fakeExamHistory = [
    {
      examId: 1,
      attempts: [
        { score: 85, date: '2024-03-01', listeningCorrect: 20, readingCorrect: 25 },
        { score: 90, date: '2024-03-15', listeningCorrect: 22, readingCorrect: 28 },
      ],
    },
    {
      examId: 2,
      attempts: [
        { score: 75, date: '2024-02-20', listeningCorrect: 18, readingCorrect: 20 },
        { score: 80, date: '2024-03-10', listeningCorrect: 19, readingCorrect: 23 },
      ],
    },
  ]

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
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const handleViewUser = (user) => {
    navigate(`/toeic/users/${user.id}`) // Navigate to UserDetail with user ID
  }

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5 // Number of users per page

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Add more fake users
  const additionalUsers = [
    {
      id: 14,
      username: 'alicegreen',
      email: 'alice.green@example.com',
      status: 'Active',
      membershipType: 'Regular',
      lastLogin: '2024-03-21',
      registeredDate: '2024-01-05',
      examsTaken: 12,
    },
    {
      id: 15,
      username: 'bobwhite',
      email: 'bob.white@example.com',
      status: 'Blocked',
      membershipType: 'Premium',
      lastLogin: '2024-03-22',
      registeredDate: '2024-02-10',
      examsTaken: 5,
    },
    {
      id: 16,
      username: 'charlieblack',
      email: 'charlie.black@example.com',
      status: 'Active',
      membershipType: 'Regular',
      lastLogin: '2024-03-23',
      registeredDate: '2024-01-15',
      examsTaken: 8,
    },
    {
      id: 17,
      username: 'davidblue',
      email: 'david.blue@example.com',
      status: 'Inactive',
      membershipType: 'Premium',
      lastLogin: '2024-03-24',
      registeredDate: '2024-02-20',
      examsTaken: 10,
    },
    {
      id: 18,
      username: 'evewhite',
      email: 'eve.white@example.com',
      status: 'Active',
      membershipType: 'Regular',
      lastLogin: '2024-03-25',
      registeredDate: '2024-03-01',
      examsTaken: 6,
    },
    // ... add more users as needed ...
  ]

  useEffect(() => {
    setUsers((prev) => [...prev, ...additionalUsers]) // Add additional users to the existing list
  }, [])

  // Calculate the current users to display
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

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
                  {filteredUsers.length > 0 ? (
                    currentUsers.map((user) => (
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
                            onClick={() => handleViewUser(user)}
                          >
                            <CIcon icon={cilUser} />
                          </CButton>
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
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="8" className="text-center">
                        No users available.
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
              {/* Pagination Controls */}
              <div>
                {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
                  <CButton
                    className="me-1"
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    color={currentPage === i + 1 ? 'primary' : 'secondary'} // Highlight current page
                  >
                    {i + 1}
                  </CButton>
                ))}
              </div>
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
          Are you sure you want to delete user &quot;{selectedUser?.username}?&quot; This action
          cannot be undone.
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
              <p>
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Status:</strong> {selectedUser.status}
              </p>
              <p>
                <strong>Membership:</strong> {selectedUser.membershipType}
              </p>
              <p>
                <strong>Registration Date:</strong> {selectedUser.registeredDate}
              </p>
              <p>
                <strong>Last Login:</strong> {selectedUser.lastLogin}
              </p>
              <p>
                <strong>Exams Taken:</strong> {selectedUser.examsTaken}
              </p>
              <h5>Exam History</h5>
              {examHistory.map((exam) => (
                <div key={exam.examId}>
                  <h6>Exam ID: {exam.examId}</h6>
                  {exam.attempts.map((attempt, index) => (
                    <div key={index}>
                      <p>
                        Score: {attempt.score} - Date: {attempt.date}
                      </p>
                      <p>
                        Listening Correct: {attempt.listeningCorrect}, Reading Correct:{' '}
                        {attempt.readingCorrect}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
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
