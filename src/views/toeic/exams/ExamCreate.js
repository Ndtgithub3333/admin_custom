import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
  CAlert,
  CFormFeedback,
} from '@coreui/react'

const ExamCreate = () => {
  const [examData, setExamData] = useState({
    title: '',
    difficulty: 'intermediate',
    status: 'Draft',
  })
  const [fileSelected, setFileSelected] = useState(false)
  const [fileValid, setFileValid] = useState(null)
  const [touched, setTouched] = useState({
    title: false,
    difficulty: false,
    status: false,
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    // Validate title
    if (!examData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    // Validate difficulty
    if (!examData.difficulty) {
      newErrors.difficulty = 'Difficulty is required'
    }

    // Validate status
    if (!examData.status) {
      newErrors.status = 'Status is required'
    }

    // Validate file
    if (!fileSelected || fileValid !== true) {
      newErrors.file = 'A valid file is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setExamData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }))
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFileSelected(true)
      setFileValid(null) // Reset validation when new file is selected
      console.log('File selected:', file.name)
    }
  }

  const handleFileValidation = () => {
    console.log('Validate uploaded file')
    // Add validation logic here
    setFileValid(true) // or false based on validation
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({
      title: true,
      difficulty: true,
      status: true,
    })

    if (validateForm()) {
      console.log('Form submitted:', examData)
      // Add API call here
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create New Exam</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="examTitle">Exam Title</CFormLabel>
                  <CFormInput
                    id="examTitle"
                    name="title"
                    value={examData.title}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('title')}
                    placeholder="Enter exam title"
                    invalid={touched.title && errors.title}
                  />
                  {touched.title && errors.title && (
                    <CFormFeedback invalid>{errors.title}</CFormFeedback>
                  )}
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="difficulty">Difficulty Level</CFormLabel>
                  <CFormSelect
                    id="difficulty"
                    name="difficulty"
                    value={examData.difficulty}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('difficulty')}
                    invalid={touched.difficulty && errors.difficulty}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </CFormSelect>
                  {touched.difficulty && errors.difficulty && (
                    <CFormFeedback invalid>{errors.difficulty}</CFormFeedback>
                  )}
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="status">Status</CFormLabel>
                  <CFormSelect
                    id="status"
                    name="status"
                    value={examData.status}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('status')}
                    invalid={touched.status && errors.status}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </CFormSelect>
                  {touched.status && errors.status && (
                    <CFormFeedback invalid>{errors.status}</CFormFeedback>
                  )}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="uploadExcel">Upload Excel</CFormLabel>
                  <input 
                    type="file" 
                    accept=".xlsx" 
                    onChange={handleFileUpload} 
                    style={{ display: 'block' }} 
                    id="upload-excel"
                  />
                  {fileSelected && (
                    <div className="d-flex gap-2 mt-2">
                      <CButton color="info" onClick={handleFileValidation}>Check File</CButton>
                      {fileValid !== null && (
                        <CAlert color={fileValid ? 'success' : 'danger'} className="mt-2">
                          {fileValid ? 'File is valid!' : 'File is invalid!'}
                        </CAlert>
                      )}
                    </div>
                  )}
                  {touched.file && errors.file && (
                    <div className="text-danger mt-1">{errors.file}</div>
                  )}
                </CCol>
              </CRow>
              <CButton 
                type="submit" 
                color="primary"
              >
                Save Exam
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ExamCreate
