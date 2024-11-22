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
  CWidgetStatsF,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
  cilDollar, 
  cilPeople, 
  cilCart, 
  cilChartLine, 
  cilSearch,
  cilFilter,
  cilUser
} from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { CChart } from '@coreui/react-chartjs'

import { formatCurrency } from '../../../utils/formatCurrency'
const Revenue = () => {
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        membershipType: 'Premium'
      },
      amount: 99.99,
      date: '2024-03-20 10:30 AM',
      status: 'Completed',
      invoiceId: 'INV-2024-001'
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        membershipType: 'Premium'
      },
      amount: 99.99,
      date: '2024-03-19 15:45 PM',
      status: 'Completed',
      invoiceId: 'INV-2024-002'
    },
  ])

  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    package: '',
    dateRange: '',
    startDate: '',
    endDate: ''
  })
  const [viewModal, setViewModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  // Search and Filter Logic
  useEffect(() => {
    let result = [...transactions]

    if (searchTerm) {
      result = result.filter(
        (transaction) =>
          transaction.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filters.status) {
      result = result.filter((transaction) => transaction.status === filters.status)
    }

    if (filters.package) {
      result = result.filter((transaction) => transaction.package === filters.package)
    }

    if (filters.dateRange) {
      const today = new Date()
      const days = {
        last7days: 7,
        last30days: 30,
        last90days: 90,
      }
      const daysAgo = new Date(today.setDate(today.getDate() - days[filters.dateRange]))
      result = result.filter((transaction) => new Date(transaction.date) >= daysAgo)
    } else if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate)
      const end = new Date(filters.endDate)
      result = result.filter((transaction) => {
        const date = new Date(transaction.date)
        return date >= start && date <= end
      })
    }

    setFilteredTransactions(result)
  }, [transactions, searchTerm, filters])

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const handleViewUserDetails = (userId) => {
    navigate(`/toeic/users/${userId}`)
  }

  // Charts data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Revenue',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        borderColor: 'rgba(0, 123, 255, 1)',
        pointBackgroundColor: 'rgba(0, 123, 255, 1)',
        data: [30000, 35000, 32000, 38000, 42000, 45000],
      },
    ],
  }

  const subscriptionData = {
    labels: ['Premium', 'Regular'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  }

  return (
    <>
      <CRow>
        <CCol sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon icon={cilDollar} height={24} />}
            title="Total Revenue"
            value={formatCurrency(245890000)}
            color="primary"
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon icon={cilPeople} height={24} />}
            title="Premium Users"
            value="1,234"
            color="info"
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon icon={cilCart} height={24} />}
            title="New Sales (30 days ago)"
            value="89"
            color="success"
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            icon={<CIcon icon={cilChartLine} height={24} />}
            title="Growth Rate"
            value="+12.5%"
            color="warning"
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol md={8}>
          <CCard className="mb-4">
            <CCardHeader>Revenue Overview</CCardHeader>
            <CCardBody>
              <CChart type="line" data={revenueData} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <CCard className="mb-4">
            <CCardHeader>Subscription Distribution</CCardHeader>
            <CCardBody>
              <CChart type="doughnut" data={subscriptionData} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Transaction History</strong>
                  <CBadge color="primary" className="ms-2">
                    {transactions.length} Transactions
                  </CBadge>
                </div>
                <div className="d-flex gap-2">
                  <CInputGroup style={{ width: '300px' }}>
                    <CFormInput
                      placeholder="Search transactions..."
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
                          <option value="Completed">Completed</option>
                          <option value="Pending">Pending</option>
                          <option value="Failed">Failed</option>
                        </CFormSelect>
                      </CDropdownItem>
                      
                      <CDropdownItem header>Date Range</CDropdownItem>
                      <CDropdownItem>
                        <CFormSelect
                          size="sm"
                          value={filters.dateRange}
                          onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                        >
                          <option value="">Custom Range</option>
                          <option value="last7days">Last 7 Days</option>
                          <option value="last30days">Last 30 Days</option>
                          <option value="last90days">Last 90 Days</option>
                        </CFormSelect>
                      </CDropdownItem>

                      <CDropdownItem header>Custom Date Range</CDropdownItem>
                      <CDropdownItem>
                        <div className="d-flex gap-2">
                          <div>
                            <small>From</small>
                            <CFormInput
                              type="date"
                              size="sm"
                              value={filters.startDate}
                              onChange={(e) => handleFilterChange('startDate', e.target.value)}
                            />
                          </div>
                          <div>
                            <small>To</small>
                            <CFormInput
                              type="date"
                              size="sm"
                              value={filters.endDate}
                              onChange={(e) => handleFilterChange('endDate', e.target.value)}
                            />
                          </div>
                        </div>
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
                    <CTableHeaderCell>Invoice ID</CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Membership Type</CTableHeaderCell>
                    <CTableHeaderCell>Amount</CTableHeaderCell>
                    <CTableHeaderCell>Date & Time</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredTransactions.map((transaction) => (
                    <CTableRow key={transaction.id}>
                      <CTableDataCell>{transaction.invoiceId}</CTableDataCell>
                      <CTableDataCell>{transaction.user.name}</CTableDataCell>
                      <CTableDataCell>{transaction.user.email}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={transaction.user.membershipType === 'Premium' ? 'warning' : 'info'}>
                          {transaction.user.membershipType}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{formatCurrency(transaction.amount)}</CTableDataCell>
                      <CTableDataCell>{transaction.date}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge 
                          color={
                            transaction.status === 'Completed' 
                              ? 'success' 
                              : transaction.status === 'Pending'
                              ? 'warning'
                              : 'danger'
                          }
                        >
                          {transaction.status}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            setSelectedTransaction(transaction)
                            setViewModal(true)
                          }}
                        >
                          Details
                        </CButton>
                        {/* <CButton
                          color="primary"
                          size="sm"
                          onClick={() => handleViewUserDetails(transaction.user.id)}
                        >
                          <CIcon icon={cilUser} />
                        </CButton> */}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Transaction Details Modal */}
      <CModal visible={viewModal} onClose={() => setViewModal(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Transaction Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedTransaction && (
            <div>
              <p><strong>Invoice ID:</strong> {selectedTransaction.invoiceId}</p>
              <p><strong>User:</strong> {selectedTransaction.user.name}</p>
              <p><strong>Email:</strong> {selectedTransaction.user.email}</p>
              <p><strong>Membership Type:</strong> {selectedTransaction.user.membershipType}</p>
              <p><strong>Amount:</strong> {formatCurrency(selectedTransaction.amount)}</p>
              <p><strong>Date & Time:</strong> {selectedTransaction.date}</p>
              <p><strong>Status:</strong> {selectedTransaction.status}</p>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setViewModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Revenue
