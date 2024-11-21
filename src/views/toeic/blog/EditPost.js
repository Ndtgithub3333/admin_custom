import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import DOMPurify from 'dompurify'
import './quill-custom.css'
import CIcon from '@coreui/icons-react'
import { cilSave, cilTrash } from '@coreui/icons'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    imagePreview: null,
    author: '',
    publishDate: '',
    status: '',
    // likes: 0
  })
  const quillRef = useRef(null)

  useEffect(() => {
    // Mock data
    const mockPost = {
      id: 1,
      title: 'Top 10 TOEIC Tips for Beginners',
      category: 'Study Tips',
      content: '<h2>Getting Started</h2><p>Here are some tips...</p>',
      imagePreview: 'https://placehold.co/600x400',
      author: 'John Doe',
      publishDate: '2024-03-15',
      status: 'Published',
      // likes: 156
    }
    setFormData(mockPost)
  }, [id])

  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const editor = quillRef.current?.getEditor()
          if (editor) {
            const range = editor.getSelection() || { index: editor.getLength(), length: 0 }
            editor.insertEmbed(range.index, 'image', reader.result)
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }, [])

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleInputChange('imagePreview', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdate = () => {
    console.log('Updated post:', formData)
    navigate('/toeic/blog/posts')
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      console.log('Deleted post:', id)
      navigate('/toeic/blog/posts')
    }
  }

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
        [{ align: [] }, { indent: '-1' }, { indent: '+1' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        image: handleImageUpload,
      },
    }
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'font', 'size',
    'align', 'indent',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ]

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Edit Post</strong>
              <div className="d-flex gap-2">
                <CButton 
                  color="secondary" 
                  variant="outline"
                  onClick={() => navigate('/toeic/blog/posts')}
                  className="d-flex align-items-center gap-2"
                >
                  <CIcon icon={cilTrash} /> Cancel
                </CButton>
                <CButton 
                  color="primary"
                  onClick={handleUpdate}
                  className="d-flex align-items-center gap-2"
                >
                  <CIcon icon={cilSave} /> Update
                </CButton>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs" role="tablist">
              <CNavItem>
                <CNavLink active={activeTab === 1} onClick={() => setActiveTab(1)}>
                  Editor
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeTab === 2} onClick={() => setActiveTab(2)}>
                  Preview
                </CNavLink>
              </CNavItem>
            </CNav>

            <CTabContent className="p-4">
              <CTabPane visible={activeTab === 1} role="tabpanel">
                <CForm>
                  <div className="mb-3">
                    <CFormLabel>Title</CFormLabel>
                    <CFormInput
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Category</CFormLabel>
                    <CFormSelect
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="Study Tips">Study Tips</option>
                      <option value="Listening">Listening</option>
                      <option value="Reading">Reading</option>
                      <option value="Grammar">Grammar</option>
                    </CFormSelect>
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Status</CFormLabel>
                    <CFormSelect
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </CFormSelect>
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Author</CFormLabel>
                    <CFormInput
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Publish Date</CFormLabel>
                    <CFormInput
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => handleInputChange('publishDate', e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Featured Image</CFormLabel>
                    <div className="featured-image-container">
                      <CFormInput
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-3"
                      />
                      {formData.imagePreview && (
                        <div className="image-preview-wrapper mb-3">
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            className="featured-image-preview"
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                              borderRadius: '8px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Content</CFormLabel>
                    <div className="editor-container" style={{ position: 'relative', paddingBottom: '60px' }}>
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={formData.content}
                        onChange={handleEditorChange}
                        modules={modules}
                        formats={formats}
                        style={{
                          height: '400px',
                          marginBottom: '50px',
                        }}
                      />
                    </div>
                  </div>
                </CForm>
              </CTabPane>

              <CTabPane visible={activeTab === 2}>
                <div className="blog-preview">
                  <h1 className="blog-title">{formData.title}</h1>
                  
                  <div className="blog-meta mb-4">
                    {formData.author && (
                      <span className="blog-author">
                        <i className="fas fa-user me-2"></i>
                        {formData.author}
                      </span>
                    )}
                    {formData.publishDate && (
                      <span className="blog-date ms-3">
                        <i className="fas fa-calendar-alt me-2"></i>
                        {new Date(formData.publishDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {formData.category && (
                    <div className="mb-3">
                      <span className="badge bg-info px-3 py-2">
                        {formData.category}
                      </span>
                    </div>
                  )}

                  {formData.imagePreview && (
                    <div className="mb-4">
                      <img
                        src={formData.imagePreview}
                        alt="Featured"
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      />
                    </div>
                  )}

                  <div
                    className="ql-editor blog-content"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(formData.content)
                    }}
                  />
                </div>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditPost
