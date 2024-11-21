import React, { useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilSearch, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const ExamList = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      title: 'TOEIC Full Test 01',
      difficulty: 'Intermediate',
      attempts: 156,
      avgScore: 685,
      status: 'Published',
      postedTime: '2023-10-01 10:00 AM', // Example posted time
    },
    // Add more mock data
  ])

  const navigate = useNavigate()

  const handleViewDetails = (examId) => {
    navigate(`/toeic/exams/details/${examId}`)
  }

  const handleEditExam = (examId) => {
    navigate(`/toeic/exams/edit/${examId}`)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <strong>Exam Management</strong>
              <div>
                <CButton color="primary" className="me-2" onClick={() => navigate('/toeic/exams/create')}>
                  Create New Exam
                </CButton>
                <CButton color="success" className="me-2" onClick={() => console.log('Download template')}>
                  Download Template
                </CButton>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Difficulty</CTableHeaderCell>
                  <CTableHeaderCell>Số lượt làm</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Posted Time</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {exams.map((exam) => (
                  <CTableRow key={exam.id}>
                    <CTableDataCell>{exam.title}</CTableDataCell>
                    <CTableDataCell>{exam.difficulty}</CTableDataCell>
                    <CTableDataCell>{exam.attempts}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={exam.status === 'Published' ? 'success' : 'warning'}>
                        {exam.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{exam.postedTime}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-2">
                        <CButton color="info" variant="ghost" size="sm" onClick={() => handleViewDetails(exam.id)}>
                          <CIcon icon={cilSearch} />
                        </CButton>
                        <CButton color="primary" variant="ghost" size="sm" onClick={() => handleEditExam(exam.id)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton color="danger" variant="ghost" size="sm" onClick={() => console.log('Delete exam:', exam.id)}>
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ExamList
